import { getToDos } from "../controller/controller"
import { getSelectedProject } from "../controller/controller"
import { openDialog, closeDialog } from "../utils"

export const TODO_DIALOG_ID = 'toDoDialog'

export function renderToDosContainer() {
    let toDosContainer = document.querySelector('.toDosContainer')
    const mainContent = document.querySelector('.mainContent')

    if(toDosContainer) {
        toDosContainer.innerHTML = ''
    }
    else {
        toDosContainer = document.createElement('div')
        toDosContainer.classList.add('toDosContainer')
    }   

    const toDosActions = document.createElement('div')
    toDosActions.classList.add('actions')
    toDosContainer.appendChild(toDosActions)

    const titleToDo = document.createElement('div')
    titleToDo.classList.add('title')

    if(getSelectedProject()) {
        titleToDo.textContent = 'Project ' + getSelectedProject().title
    }
    else {
        titleToDo.textContent = 'Select a project to see its to dos...'
    }
    toDosContainer.appendChild(titleToDo)
    
    
    if(getSelectedProject() !== undefined) { //only render this if there is a project selected
        const btnNewTodo = document.createElement('button')
        btnNewTodo.textContent = 'Add To Do'
        btnNewTodo.setAttribute('data-action', 'show-todo-modal')
        toDosActions.appendChild(btnNewTodo)
    }

    const toDosList = document.createElement('div')
    toDosList.id = 'toDosList'
    toDosContainer.appendChild(toDosList)

    mainContent.appendChild(toDosContainer)
    
    if(!document.querySelector('#' + TODO_DIALOG_ID)) {
        renderToDoDialog()
    }

    renderToDos()
}

function renderToDos() {
    const toDosContainer = document.querySelector('#toDosList')
    toDosContainer.innerHTML = ''
    const toDos = getToDos()
    if(toDos && toDos.length > 0) {
        toDos.forEach((toDo) => {
            renderToDoFolder(toDo)
        })
    }
    else {
        const toDoList = document.querySelector('#toDosList')
        toDoList.textContent = 'No to dos to show for this project...'
    }
}

function renderToDoFolder(toDo) {
    const div = document.createElement('div')
    div.classList.add('toDoFolder')
    div.setAttribute('data-action', 'select-todo')
    div.dataset.todoId = toDo.id

    const toDoTitle = document.createElement('div')
    toDoTitle.classList.add('label')
    toDoTitle.textContent = 'Title: ' + toDo.title

    const toDoDescription = document.createElement('div')
    toDoDescription.classList.add('label')
    toDoDescription.textContent = 'Description: ' + toDo.description

    const toDoDueDate = document.createElement('div')
    toDoDueDate.classList.add('label')
    toDoDueDate.textContent = 'Due date: ' + toDo.dueDate

    const toDoPriority = document.createElement('div')
    toDoPriority.classList.add('label')
    toDoPriority.textContent = 'Priority: ' + toDo.priority

    div.appendChild(toDoTitle)
    div.appendChild(toDoDescription)
    div.appendChild(toDoDueDate)
    div.appendChild(toDoPriority)

    const toDoList = document.querySelector('#toDosList')
    toDoList.appendChild(div)
}

function renderToDoDialog() {
    if (document.querySelector(TODO_DIALOG_ID)) {
        return
    }
    const body = document.querySelector('body')
    const toDoDialog = document.createElement('dialog')
    toDoDialog.id = TODO_DIALOG_ID

    const titleDialog = document.createElement('div')
    titleDialog.textContent = 'Edit to do'

    const todoForm = document.createElement('form')

    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Title'
    titleInput.type = 'text'
    titleInput.id = 'TODO_TITLE'
    
    const descriptionInput = document.createElement('input')
    descriptionInput.placeholder = 'Description'
    descriptionInput.type = 'text'
    descriptionInput.id = 'TODO_DESC'

    const dueDateInput = document.createElement('input')
    dueDateInput.placeholder = 'Due date'
    dueDateInput.type = 'date'
    dueDateInput.id = 'TODO_DUEDATE'

    const priorityInput = document.createElement('input')
    priorityInput.placeholder = 'Priority'
    priorityInput.type = 'integer'
    priorityInput.id = 'TODO_PRIORITY'

    const saveProjectBtn = document.createElement('button')
    saveProjectBtn.textContent = 'Save'
    saveProjectBtn.setAttribute('data-action', 'save-todo')
    
    todoForm.appendChild(titleInput)
    todoForm.appendChild(descriptionInput)
    todoForm.appendChild(dueDateInput)
    todoForm.appendChild(priorityInput)
    todoForm.appendChild(saveProjectBtn)
    titleDialog.appendChild(todoForm)
    toDoDialog.appendChild(titleDialog)
    body.appendChild(toDoDialog)
}
