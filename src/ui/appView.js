import { createProject, getProjects } from "../controller/controller"

export function renderProjects() {
    const projectList = document.querySelector('#projectList')
    projectList.innerHTML = ''
    const projects = getProjects()
    projects.forEach((project) => {
            let div = document.createElement('div')
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
}

export function init() {
    document.addEventListener('click', (event) => {
        switch(event.target.id) {
            case 'btnAddProject': 
                createProject('Test')
                renderProjects()
        }

    })
}

function renderTopContainer() {
    const topContainer = document.createElement('div')
    topContainer.classList.add('topContainer')
    return topContainer
}

function renderProjectContainer() {
    const projectContainer = document.createElement('div')
    projectContainer.classList.add('projectContainer')
    const btnAddProject = document.createElement('button')
    btnAddProject.id = 'btnAddProject'
    btnAddProject.textContent = 'New project'
    projectContainer.appendChild(btnAddProject)
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
