import { createProject, getProjects, selectProject, getSelectedProject, addToDo, getToDos } from "../controller/controller"
import { renderToDosContainer, TODO_DIALOG_ID } from "./toDoView.js"
import { renderProjectContainer, saveProject, PROJECT_DIALOG_ID } from "./projectView.js"
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
        switch(event.target.dataset.action) {
            case 'save-project':
                saveProject()
                break
            case 'save-todo':
                event.preventDefault()
                closeDialog(TODO_DIALOG_ID)
                const toDoTitle = document.querySelector('#inputToDoTitle')
                addToDo(toDoTitle.value)
                toDoTitle.value = ''
                renderToDosContainer()
                console.log('save to do')
                break
            case 'show-project-modal':
                openDialog(PROJECT_DIALOG_ID)
                break
            case 'show-todo-modal':
                openDialog(TODO_DIALOG_ID)
                break
            case 'select-project':
                const projectId = event.target.closest('[data-project-id]').dataset.projectId
                selectProject(projectId)
                renderToDosContainer()
                renderProjectContainer()
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

