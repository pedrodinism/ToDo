import { Project } from "../models/projects.js"
import { ToDo } from "../models/todo.js"

let projects = []
let selectedProjectId = null

export function getProjects(projectId = null) {
    if(projectId) {
        return projects.find(project => project.id = projectId)
    }
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

export function saveToDo (title, description, dueDate, priority, projectId = null, toDoId = null) {
    let toDo = null
    let project = null
    if(projectId) {
        project = getProjects(projectId)
        toDo = project.toDos.find(todo => todo.id = toDoId)
        toDo.editToDo(title, description, dueDate, priority)
        return toDo
    }
    toDo = new ToDo(title, description, dueDate, priority)
    project = projects.find(project => project.id === selectedProjectId)
    project.addToDo(toDo)
    return toDo
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