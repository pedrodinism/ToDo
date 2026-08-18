import { Project } from "../models/projects"
import { ToDo } from "../models/todo"

export class Storage {
    save(projects) {
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    load() {
        const projects = []
        const data = localStorage.getItem('projects')
        if(!data) {
            return
        }
        const objects = JSON.parse(data)
        objects.forEach((object) => {
            const project = new Project(object.title, object.id)
            object.todos.forEach((todo) => {
                const newTodo = new ToDo (todo.title, todo.description, todo.dueDate, todo.priority, todo.id)
                project.addToDo(newTodo)
            })            
            projects.push(project)
        })
        return projects
    }
} 