export class Storage {
    save(projects) {
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    load() {
        //const projects = JSON.parse(localStorage.getItem('projects'))
    }
} 