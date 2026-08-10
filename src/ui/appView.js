import { createProject, getProjects, selectProject, getSelectedProject, addToDo, getToDos } from "../controller/controller"
import { renderToDosContainer } from "./toDoView.js"
import { renderProjectsDialog, saveProject } from "./projectView.js"

export function renderLayout() {
    const body = document.querySelector('body')
    body.innerHTML = ''
    body.appendChild(renderTopContainer())
    const mainContent = renderMainContent()
    body.appendChild(mainContent)
    renderProjectContainer()
    renderToDosContainer()
    renderToDoDialog()
}

export function init() {
    document.addEventListener('click', (event) => {
        switch(event.target.dataset.action) {
            case 'save-project':
                saveProject()
                break
            case 'save-todo':
                event.preventDefault()
                closeDialog('#toDoDialog')
                const toDoTitle = document.querySelector('#inputToDoTitle')
                addToDo(toDoTitle.value)
                toDoTitle.value = ''
                renderToDos()
                console.log('save to do')
                break
            case 'show-project-modal':
                openDialog('#projectsDialog')
                break
            case 'show-todo-modal':
                openDialog('#toDoDialog')
                break
            case 'select-project':
                const projectId = event.target.closest('[data-project-id]').dataset.projectId
                selectProject(projectId)
                renderToDosContainer()
                renderToDos()
                renderProjects()
                break
        }

    })
}

function renderTopContainer() {
    const topContainer = document.createElement('div')
    topContainer.classList.add('topContainer')
    topContainer.textContent = 'To Do'
    return topContainer
}

function renderMainContent() {
    const mainContent = document.createElement('div')
    mainContent.classList.add('mainContent')
    return mainContent
}
