export function openDialog (id) {
    document.querySelector('#' + id).showModal()
}

export function closeDialog (id) {
    document.querySelector('#' + id).close()
}