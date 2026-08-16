import { selectProject, saveProject, saveToDo, removeProject, getProjects, getSelectedProject, removeToDo } from "../controller/controller"
import { renderToDoDialog, renderToDosContainer, TODO_DIALOG_ID } from "./toDoView.js"
import { renderProjectContainer , PROJECT_DIALOG_ID, renderProjectsDialog } from "./projectView.js"
import { openDialog, closeDialog } from "../utils"

export function renderLayout() {
    const body = document.querySelector('body')
    body.innerHTML = ''
    renderTopContainer()
    renderMainContent()
    renderProjectContainer()
    renderToDosContainer()
}

export function init() {
    document.addEventListener('click', (event) => {
        const actionElement = event.target.closest('[data-action]')
        if (!actionElement) return

        // When 2 to dos are created and the user clicks edit on the second, there is an error (at some point the 1st one was being selected also)

        let projectId = event.target.closest('[data-project-id]')?.dataset.projectId
        let todoId = event.target.closest('[data-todo-id]')?.dataset.todoId

        if(!projectId && todoId) {
            projectId = getSelectedProject()?.id
        }

        switch(actionElement.dataset.action) {            
            case 'save-project':
                event.preventDefault()
                closeDialog(PROJECT_DIALOG_ID)
                const projectTitle = document.querySelector('#inputProjectTitle')
                saveProject(projectTitle.value, projectId)
                projectTitle.value = ''
                renderProjectContainer()
                renderToDosContainer()
                break
            case 'save-todo':
                event.preventDefault()
                closeDialog(TODO_DIALOG_ID)
                const title = document.querySelector('#TODO_TITLE')
                const desc = document.querySelector('#TODO_DESC')
                const dueDate = document.querySelector('#TODO_DUEDATE')
                const priority = document.querySelector('#TODO_PRIORITY')
                saveToDo(title.value, desc.value, dueDate.value, priority.value, projectId, todoId)
                title.value = ''
                desc.value = ''
                dueDate.value = ''
                priority.value = 0
                renderToDosContainer()
                break
            case 'show-project-modal': 
                renderProjectsDialog(projectId)
                openDialog(PROJECT_DIALOG_ID)
                break
            case 'show-todo-modal':
                console.log(getProjects())
                renderToDoDialog(projectId, todoId)
                openDialog(TODO_DIALOG_ID)
                break
            case 'select-project':
                selectProject(projectId)
                renderToDosContainer()
                renderProjectContainer()
                break
            case 'delete-project':
                removeProject(projectId)
                renderProjectContainer()
                renderToDosContainer()
                break
            case 'delete-todo':
                removeToDo(projectId, todoId)
                renderToDosContainer()
                break
        }
    })
}

function renderTopContainer() {
    const body = document.querySelector('body')
    const topContainer = document.createElement('div')
    topContainer.classList.add('topContainer')
    topContainer.textContent = 'To Do'
    body.appendChild(topContainer)
}

function renderMainContent() {
    const body = document.querySelector('body')
    const mainContent = document.createElement('div')
    mainContent.classList.add('mainContent')
    body.appendChild(mainContent)
}

