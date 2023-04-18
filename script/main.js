document.addEventListener('DOMContentLoaded', () => {
    new Sortable(example1, {
        animation: 150,
        ghostClass: 'blue-background-class'
    });
});