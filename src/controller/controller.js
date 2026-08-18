import { Project } from "../models/projects.js"
import { ToDo } from "../models/todo.js"
import { Storage } from "../storage/storage.js"

let projects = []
let selectedProjectId = null
let storage = new Storage()

export function initializeData () {
    const storageProjects = storage.load()
    if(storageProjects && storageProjects.length > 0) {
        projects = storageProjects
        selectProject(projects[0].id)
        return
    }
    const project = new Project ('My default project')
    projects.push(project)
    selectProject(project.id)
}

export function getProjects(projectId = null) {
    if(projectId) {
        return projects.find(project => project.id === projectId)
    }
    return projects
}

export function saveProject(title, projectId = null) {
    if(projectId) {
        const project = projects.find(project => project.id === projectId)
        project.editProject(title)
        storage.save(projects)
        return project
    }

    const project = new Project(title)
    projects.push(project)
    storage.save(projects)
    return project

    storage.save(projects)
}

export function selectProject(id) {
    selectedProjectId = id
}

export function getSelectedProject() {
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    return selectedProject
}

export function saveToDo (title, description, dueDate, priority, projectId, toDoId = null) {
    if(!projectId) {
        return
    }
    
    let toDo = null
    let project = getProjects(projectId)

    if(toDoId) {
        toDo = project.todos.find(todo => todo.id === toDoId)
        toDo.editToDo(title, description, dueDate, priority)
        storage.save(projects)
        return toDo
    }

    toDo = new ToDo(title, description, dueDate, priority)
    project.addToDo(toDo)
    storage.save(projects)
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
    storage.save(projects)
}

export function removeToDo (projectId, toDoId) {
    const project = projects.find(project => project.id === projectId)
    if (!project) {
        return
    }
    project.removeToDo(toDoId)
    storage.save(projects)
}