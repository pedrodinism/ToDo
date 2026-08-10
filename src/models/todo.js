export class ToDo {
    constructor(title) {
        this.id = crypto.randomUUID()
        this.title = title
    }  
}