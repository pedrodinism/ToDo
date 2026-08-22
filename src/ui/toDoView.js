import { getProjects, getToDos } from "../controller/controller";
import { getSelectedProject } from "../controller/controller";
import { format } from "date-fns";

export const TODO_DIALOG_ID = "toDoDialog";

export function renderToDosContainer() {
  let toDosContainer = document.querySelector(".toDosContainer");
  const mainContent = document.querySelector(".mainContent");

  if (toDosContainer) {
    toDosContainer.innerHTML = "";
  } else {
    toDosContainer = document.createElement("div");
    toDosContainer.classList.add("toDosContainer");
  }

  const topSection = document.createElement("div");
  topSection.classList.add("TopSection");

  const titleSection = document.createElement("div");
  titleSection.classList.add("TitleSection");
  titleSection.textContent = "To Dos";

  const actionSection = document.createElement("div");
  actionSection.classList.add("actions");

  topSection.appendChild(titleSection);
  topSection.appendChild(actionSection);
  toDosContainer.appendChild(topSection);

  if (getSelectedProject()) {
    titleSection.textContent = getSelectedProject().title + "'s to dos";
  }

  if (getSelectedProject() !== undefined) {
    //only render this if there is a project selected
    const btnNewTodo = document.createElement("button");
    btnNewTodo.textContent = "Add To Do";
    btnNewTodo.setAttribute("data-action", "show-todo-modal");
    actionSection.appendChild(btnNewTodo);
  }

  const toDosList = document.createElement("div");
  toDosList.id = "toDosList";
  toDosContainer.appendChild(toDosList);

  mainContent.appendChild(toDosContainer);

  renderToDos();
}

function renderToDos() {
  const toDosContainer = document.querySelector("#toDosList");
  toDosContainer.innerHTML = "";
  const toDos = getToDos();
  if (toDos && toDos.length > 0) {
    toDos.forEach((toDo) => {
      renderToDoFolder(toDo);
    });
  } else {
    const toDoList = document.querySelector("#toDosList");
    toDoList.textContent = "No to dos to show for this project...";
  }
}

function renderToDoFolder(toDo) {
  const div = document.createElement("div");
  div.classList.add("toDoFolder");
  div.setAttribute("data-action", "select-todo");
  div.dataset.todoId = toDo.id;

  const toDoInfo = document.createElement("div");
  toDoInfo.classList.add("toDoInfo");
  const toDoActions = document.createElement("div");
  toDoActions.classList.add("toDoActions");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-action", "delete-todo");
  deleteButton.textContent = "Delete";

  const editButton = document.createElement("button");
  editButton.setAttribute("data-action", "show-todo-modal");
  editButton.textContent = "Edit";

  const toDoTitle = document.createElement("div");
  toDoTitle.classList.add("label");
  toDoTitle.textContent = "Title: " + toDo.title;

  const toDoDescription = document.createElement("div");
  toDoDescription.classList.add("label");
  toDoDescription.textContent = "Description: " + toDo.description;

  const toDoPriority = document.createElement("div");
  toDoPriority.classList.add("label");
  toDoPriority.textContent = "Priority: " + toDo.priority;

  toDoInfo.appendChild(toDoTitle);
  toDoInfo.appendChild(toDoDescription);

  if (toDo.dueDate) {
    const toDoDueDate = document.createElement("div");
    toDoDueDate.classList.add("label");
    toDoDueDate.textContent =
      "Due date: " + format(toDo.dueDate, "dd MMM yyyy");
    toDoInfo.appendChild(toDoDueDate);
  }

  toDoInfo.appendChild(toDoPriority);

  toDoActions.appendChild(deleteButton);
  toDoActions.appendChild(editButton);

  div.appendChild(toDoInfo);
  div.appendChild(toDoActions);

  const toDoList = document.querySelector("#toDosList");
  toDoList.appendChild(div);
}

export function renderToDoDialog(projectId = null, toDoId = null) {
  let toDoDialog = document.querySelector("#" + TODO_DIALOG_ID);

  if (toDoDialog) {
    toDoDialog.innerHTML = "";
  } else {
    toDoDialog = document.createElement("dialog");
    toDoDialog.id = TODO_DIALOG_ID;
  }

  delete toDoDialog.dataset.todoId;
  const body = document.querySelector("body");

  const titleDialog = document.createElement("div");
  titleDialog.textContent = "Edit to do";

  const todoForm = document.createElement("form");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title";
  titleInput.type = "text";
  titleInput.id = "TODO_TITLE";

  const descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "Description";
  descriptionInput.type = "text";
  descriptionInput.id = "TODO_DESC";

  const dueDateInput = document.createElement("input");
  dueDateInput.placeholder = "Due date";
  dueDateInput.type = "date";
  dueDateInput.id = "TODO_DUEDATE";

  const priorityInput = document.createElement("input");
  priorityInput.placeholder = "Priority";
  priorityInput.type = "number";
  priorityInput.min = "1";
  priorityInput.max = "5";
  priorityInput.id = "TODO_PRIORITY";

  const saveProjectBtn = document.createElement("button");
  saveProjectBtn.textContent = "Save";
  saveProjectBtn.setAttribute("data-action", "save-todo");

  if (toDoId && projectId) {
    const project = getProjects(projectId);
    const toDo = project.todos.find((todo) => todo.id === toDoId);
    toDoDialog.dataset.todoId = toDoId;
    titleInput.value = toDo.title;
    descriptionInput.value = toDo.description;
    dueDateInput.value = toDo.dueDate;
    priorityInput.value = toDo.priority;
  }

  todoForm.appendChild(titleInput);
  todoForm.appendChild(descriptionInput);
  todoForm.appendChild(dueDateInput);
  todoForm.appendChild(priorityInput);
  todoForm.appendChild(saveProjectBtn);
  titleDialog.appendChild(todoForm);
  toDoDialog.appendChild(titleDialog);
  body.appendChild(toDoDialog);
}
