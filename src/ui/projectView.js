import { getProjects } from "../controller/controller"

export function renderProjectContainer() {
    const projectContainer = document.querySelector('.projectContainer')
    const body = document.querySelector('body')

    if(projectContainer) {
        projectContainer.innerHTML = ''
    }
    else {
        projectContainer = document.createElement('div')
        projectContainer.classList.add('projectContainer')
    }   

    const projectActions = document.createElement('div')
    projectActions.classList.add('actions')
    
    const btnAddProject = document.createElement('button')
    btnAddProject.textContent = 'New project'
    btnAddProject.setAttribute('data-action', 'show-project-modal')
    projectActions.appendChild(btnAddProject)
    projectContainer.appendChild(projectActions)

    const projectList = document.createElement('div')
    projectList.id = 'projectList'
    projectContainer.appendChild(projectList)    

    body.appendChild(projectContainer)
    
    renderProjectsDialog()
    renderProjects()
}

export function saveProject () {
    event.preventDefault()
    closeDialog('#projectsDialog')
    const projectTitle = document.querySelector('#inputProjectTitle')
    createProject(projectTitle.value)
    renderProjects()
    projectTitle.value = ''
}

function renderProjects() {
    const projectList = document.querySelector('#projectList')
    projectList.innerHTML = ''
    const projects = getProjects()
    if(projects.length > 0) {
        projects.forEach((project) => {
            renderProjectFolder(project)
        })
    }
    else {
        projectList.textContent = 'Create a project to get started'
    }
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