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
    div.textContent = toDo.title

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
    toDoDialog.appendChild(titleDialog)

    const todoForm = document.createElement('form')
    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Title'
    titleInput.type = 'text'
    titleInput.id = 'inputToDoTitle'
    todoForm.appendChild(titleInput)
    titleDialog.appendChild(todoForm)

    const saveProjectBtn = document.createElement('button')
    saveProjectBtn.textContent = 'Save'
    saveProjectBtn.setAttribute('data-action', 'save-todo')
    todoForm.appendChild(saveProjectBtn)

    body.appendChild(toDoDialog)
}
