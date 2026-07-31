export function renderProjects(projects) {
    const projectContainer = document.querySelector('.projectContainer')
    projectContainer.innerHTML = ''
    projects.forEach((project) => {
            let div = document.createElement('div')
            div.id = 'project-' +  project.id
            div.textContent = project.title
            projectContainer.appendChild(div)
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

function renderTopContainer() {
    const topContainer = document.createElement('div')
    topContainer.classList.add('topContainer')
    return topContainer
}

function renderProjectContainer() {
    const projectContainer = document.createElement('div')
    projectContainer.classList.add('projectContainer')
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