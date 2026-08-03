import { Project } from "../models/projects.js"

let projects = []

export function getProjects() {
    return projects
}

export function createProject(title) {
    const proj = new Project(title)
    projects.push(proj)
}

export function testInit() {
    const proj = createProject("The Odin Project")
}