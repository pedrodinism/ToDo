import { Project } from "../models/projects.js"
import { ToDo } from "../models/todo.js"

let projects = []
let selectedProjectId = null

export function getProjects() {
    console.log(projects)
    return projects
}

export function saveProject(title, projectId = null) {
    if(projectId) {
        const project = projects.find(project => project.id === projectId)
        project.editProject(title)
        return project
    }

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

export function addToDo (title, description, dueDate, priority) {
    const toDo = new ToDo(title, description, dueDate, priority)
    const project = projects.find(project => project.id === selectedProjectId)
    project.addToDo(toDo)
}

export function getToDos () {
    const project = getSelectedProject()
    if (project) {
        return project.getToDos()
    }    
}

export function removeProject (projectId) {
    projects = projects.filter(project => project.id !== projectId)
    if (projectId === selectedProjectId) {
        selectedProjectId = null
    }
}