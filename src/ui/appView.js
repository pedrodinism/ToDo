import {
  selectProject,
  saveProject,
  saveToDo,
  removeProject,
  getProjects,
  getSelectedProject,
  removeToDo,
} from "../controller/controller";
import {
  renderToDoDialog,
  renderToDosContainer,
  TODO_DIALOG_ID,
} from "./toDoView.js";
import {
  renderProjectContainer,
  PROJECT_DIALOG_ID,
  renderProjectsDialog,
} from "./projectView.js";
import { openDialog, closeDialog } from "../utils";

export function renderLayout() {
  const body = document.querySelector("body");
  body.innerHTML = "";
  renderTopContainer();
  renderMainContent();
  renderProjectContainer();
  renderToDosContainer();
}

export function init() {
  document.addEventListener("click", (event) => {
    console.log(getProjects());

    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) return;

    console.log(
      "closest project " +
        event.target.closest("[data-project-id]")?.dataset.projectId,
    );
    console.log(
      "closest to do " + event.target.closest("[data-todo-id]")?.dataset.todoId,
    );

    let closestProjectId =
      event.target.closest("[data-project-id]")?.dataset.projectId;
    let closestToDoId = event.target.closest("[data-todo-id]")?.dataset.todoId;
    let selectedProjectId = getSelectedProject()?.id;

    switch (actionElement.dataset.action) {
      case "save-project": {
        event.preventDefault();
        closeDialog(PROJECT_DIALOG_ID);
        const projectTitle = document.querySelector("#inputProjectTitle");
        saveProject(projectTitle.value, closestProjectId);
        projectTitle.value = "";
        renderProjectContainer();
        renderToDosContainer();
        break;
      }
      case "save-todo": {
        event.preventDefault();
        closeDialog(TODO_DIALOG_ID);
        const title = document.querySelector("#TODO_TITLE");
        const desc = document.querySelector("#TODO_DESC");
        const dueDate = document.querySelector("#TODO_DUEDATE");
        const priority = document.querySelector("#TODO_PRIORITY");
        saveToDo(
          title.value,
          desc.value,
          dueDate.value,
          priority.value,
          selectedProjectId,
          closestToDoId,
        );
        title.value = "";
        desc.value = "";
        dueDate.value = "";
        priority.value = 0;
        renderToDosContainer();
        break;
      }
      case "show-project-modal": {
        renderProjectsDialog(closestProjectId);
        openDialog(PROJECT_DIALOG_ID);
        break;
      }
      case "show-todo-modal": {
        console.log(getProjects());
        renderToDoDialog(selectedProjectId, closestToDoId);
        openDialog(TODO_DIALOG_ID);
        break;
      }
      case "select-project": {
        selectProject(closestProjectId);
        renderProjectContainer();
        renderToDosContainer();
        break;
      }
      case "delete-project": {
        removeProject(closestProjectId);
        renderProjectContainer();
        renderToDosContainer();
        break;
      }

      case "delete-todo": {
        removeToDo(selectedProjectId, closestToDoId);
        renderToDosContainer();
        break;
      }
    }
  });
}

function renderTopContainer() {
  const body = document.querySelector("body");
  const topContainer = document.createElement("div");
  topContainer.classList.add("topContainer");
  topContainer.textContent = "To Do";
  body.appendChild(topContainer);
}

function renderMainContent() {
  const body = document.querySelector("body");
  const mainContent = document.createElement("div");
  mainContent.classList.add("mainContent");
  body.appendChild(mainContent);
}
