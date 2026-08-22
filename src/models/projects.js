export class Project {
  constructor(title, id = crypto.randomUUID()) {
    this.id = id;
    this.title = title;
    this.todos = [];
  }

  addToDo(toDo) {
    this.todos.push(toDo);
  }

  removeToDo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  getToDos() {
    return this.todos;
  }

  editProject(title) {
    this.title = title;
  }
}
