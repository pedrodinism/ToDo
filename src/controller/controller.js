import { Project } from "../models/projects.js"

let projects = []
let selectedProjectId = null

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
    selectedProjectId = id
}

export function getSelectedProject() {
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    return selectedProject
}