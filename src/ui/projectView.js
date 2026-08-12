import { getProjects, getSelectedProject } from "../controller/controller"
import { openDialog, closeDialog } from "../utils"

export const PROJECT_DIALOG_ID = 'projectsDialog'

export function renderProjectContainer() {
    let projectContainer = document.querySelector('.projectContainer')
    let isNew = false 

    if(!projectContainer) {
        isNew = true
    }

    const mainContent = document.querySelector('.mainContent')

    if(isNew) {
        projectContainer = document.createElement('div')
        projectContainer.classList.add('projectContainer')
    }
    else {
        projectContainer.innerHTML = ''
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

    if(isNew) {
        mainContent.appendChild(projectContainer)
    }

    if(!document.querySelector('#' + PROJECT_DIALOG_ID)) {
        renderProjectsDialog()
    }
    
    renderProjects()
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

    const titleDiv = document.createElement('div')
    titleDiv.classList.add('projectTitle')
    titleDiv.textContent = project.title

    div.appendChild(titleDiv)

    if(project.id === getSelectedProject()?.id) {
        div.classList.add('bg-color-yellow')
    }

    const projectList = document.querySelector('#projectList')
    projectList.appendChild(div)

    const actions = document.createElement('div')
    actions.classList.add('projectActions')
    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('data-action', 'delete-project')
    deleteBtn.textContent = 'Delete'

    actions.appendChild(deleteBtn)
    div.appendChild(actions)
}

function renderProjectsDialog() {
    if (document.querySelector(PROJECT_DIALOG_ID)) {
        document.querySelector(PROJECT_DIALOG_ID).innerHTML = ''
    }
    const body = document.querySelector('body')
    const projectDialog = document.createElement('dialog')
    projectDialog.id = PROJECT_DIALOG_ID

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