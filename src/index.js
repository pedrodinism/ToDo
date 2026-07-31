import { Project } from "./models/projects.js"
import { renderProjects } from "./ui/appView.js";
import { renderLayout } from "./ui/appView.js"
import "./ui/styles.css";

function startApp() {
    const projects = []
    const proj = new Project("The Odin Project")
    projects.push(proj)
    renderLayout()
    renderProjects(projects)
}

startApp();