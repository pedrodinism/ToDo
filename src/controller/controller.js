import { Project } from "../models/projects.js"

let projects = []
let selectedProject = ''

export function getProjects() {
    console.log(projects)
    return projects
}

export function createProject(title) {
    const project = new Project(title)
    projects.push(project)
    return project
}

export function testInit() {
    const proj = createProject("The Odin Project")
}

export function selectProject(id) {
    selectedProject = id
}

export function getSelectedProject() {
    selectedProject = projects.find(project => project.id === selectedProject)
    return selectedProject
}