export function renderProjects(projects) {
    const mainContent = document.querySelector('.mainContent')
    mainContent.innerHTML = ''
    projects.forEach((project) => {
            let div = document.createElement('div')
            div.id = 'project-' +  project.id
            div.textContent = project.title
            mainContent.appendChild(div)
        })
}