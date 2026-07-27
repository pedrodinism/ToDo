import { Project } from "./models/projects.js"
import { renderProjects } from "./ui/appView.js";

function startApp() {
    const projects = []
    const proj = new Project("The Odin Project")
    projects.push(proj)
    renderProjects(projects)
}

startApp();