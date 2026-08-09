import { createProject, getProjects, selectProject, getSelectedProject } from "../controller/controller"

export function renderProjects() {
    const projectList = document.querySelector('#projectList')
    projectList.innerHTML = ''
    const projects = getProjects()
    projects.forEach((project) => {
            renderProjectFolder(project)
        })
}

export function renderToDos() {
    const toDosContainer = document.querySelector('#toDosList')
    toDosContainer.innerHTML = ''
    toDosContainer.textContent = getSelectedProject()?.title

}

export function renderLayout() {
    const body = document.querySelector('body')
    body.innerHTML = ''
    body.appendChild(renderTopContainer())
    const mainContent = renderMainContent()
    body.appendChild(mainContent)
    mainContent.appendChild(renderProjectContainer())
    mainContent.appendChild(renderToDosContainer())
    renderProjectsDialog()
}

export function init() {
    document.addEventListener('click', (event) => {
        switch(event.target.dataset.action) {
            case 'save-project':
                event.preventDefault()
                closeDialog()
                const projectTitle = document.querySelector('#inputProjectTitle')
                createProject(projectTitle.value)
                renderProjects()
                projectTitle.value = ''
                break
            case 'show-project-modal':
                openDialog()
                break
            case 'select-project':
                const projectId = event.target.closest('[data-project-id]').dataset.projectId
                selectProject(projectId)
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

function renderProjectContainer() {
    const projectContainer = document.createElement('div')
    projectContainer.classList.add('projectContainer')

    const projectActions = document.createElement('div')
    projectActions.classList.add('projectActions')
    
    const btnAddProject = document.createElement('button')
    btnAddProject.textContent = 'New project'
    btnAddProject.setAttribute('data-action', 'show-project-modal')
    projectActions.appendChild(btnAddProject)
    projectContainer.appendChild(projectActions)

    const projectList = document.createElement('div')
    projectList.id = 'projectList'
    projectContainer.appendChild(projectList)    

    return projectContainer
}

function renderProjectFolder(project) {
    const div = document.createElement('div')
    div.classList.add('projectFolder')
    div.setAttribute('data-action', 'select-project')
    div.dataset.projectId = project.id
    div.textContent = project.title
    if(project.id === getSelectedProject()?.id) {
        div.classList.add('bg-color-yellow')
    }
    const projectList = document.querySelector('#projectList')
    projectList.appendChild(div)

}

function renderToDosContainer() {
    const toDosContainer = document.createElement('div')
    toDosContainer.classList.add('toDosContainer')

    const btnNewTodo = document.createElement('button')
    btnNewTodo.textContent = 'Add To Do'
    btnNewTodo.setAttribute('data-action', 'add-to-do')
    toDosContainer.appendChild(btnNewTodo)

    const toDosList = document.createElement('div')
    toDosList.id = 'toDosList'
    toDosContainer.appendChild(toDosList)

    return toDosContainer
}

function renderMainContent() {
    const mainContent = document.createElement('div')
    mainContent.classList.add('mainContent')
    return mainContent
}

function renderProjectsDialog() {
    const body = document.querySelector('body')
    const projectDialog = document.createElement('dialog')
    projectDialog.id = 'projectsDialog'

    const titleDialog = document.createElement('div')
    titleDialog.textContent = 'Edit project'
    projectDialog.appendChild(titleDialog)

    const projectForm = document.createElement('form')
    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Title'
    titleInput.type = 'text'
    titleInput.id = 'inputProjectTitle'
    projectForm.appendChild(titleInput)
    titleDialog.appendChild(projectForm)

    const saveProjectBtn = document.createElement('button')
    saveProjectBtn.textContent = 'Save'
    saveProjectBtn.setAttribute('data-action', 'save-project')
    projectForm.appendChild(saveProjectBtn)

    body.appendChild(projectDialog)
}

function closeDialog (id) {
    document.querySelector('#projectsDialog').close()
}

function openDialog (id) {
    document.querySelector('#projectsDialog').showModal()
}