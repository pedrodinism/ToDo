import { renderProjects, renderToDos } from "./ui/appView.js";
import { renderLayout } from "./ui/appView.js"
import { testInit } from "./controller/controller.js";
import { init } from "./ui/appView.js";
import "./ui/styles.css";

function startApp() {
    renderLayout()
    init()
}

startApp();