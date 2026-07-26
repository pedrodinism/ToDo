import { Project } from "./models/projects.js"

function startApp() {
    const proj = new Project("The Odin Project");
    console.log(proj);
}

startApp();