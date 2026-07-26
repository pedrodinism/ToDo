export class Project {
    constructor(title) {
        this.title = title
        this.todos = []
    }

    addToDo(toDo) {
        this.todos.push(toDo)
    }

    removeToDo (index) {
        this.todos.splice(index, 1)
    }
}