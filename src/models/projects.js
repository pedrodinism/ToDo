export class Project {
    constructor(title) {
        this.id = crypto.randomUUID()
        this.title = title
        this.todos = []
    }

    addToDo(toDo) {
        this.todos.push(toDo)
    }

    removeToDo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)        
    }
}