import { renderLayout } from "./ui/appView.js";
import { initializeData } from "./controller/controller.js";
import { init } from "./ui/appView.js";
import "./ui/styles.css";
import { renderProjectContainer } from "./ui/projectView.js";
import { renderToDosContainer } from "./ui/toDoView.js";

function startApp() {
  renderLayout();
  init();
  initializeData();
  renderProjectContainer();
  renderToDosContainer();
}

startApp();
