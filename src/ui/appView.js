import { createProject, getProjects } from "../controller/controller"

export function renderProjects() {
    const projectList = document.querySelector('#projectList')
    projectList.innerHTML = ''
    const projects = getProjects()
    console.log(projects)
    projects.forEach((project) => {
            let div = document.createElement('div')
            div.classList.add('projectFolder')
            div.id = 'project-' +  project.id
            div.textContent = project.title
            projectList.appendChild(div)
        })
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
        event.preventDefault()
        switch(event.target.dataset.action) {
            case 'save-project':
                closeDialog()
                const projectTitle = document.querySelector('#inputProjectTitle').value
                createProject(projectTitle)
                renderProjects()
                
            case 'show-project-modal':
                openDialog()
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
    projectContainer.appendChild(projectList)
    projectList.id = 'projectList'

    return projectContainer
}

function renderToDosContainer() {
    const toDosContainer = document.createElement('div')
    toDosContainer.classList.add('toDosContainer')
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