document.addEventListener('DOMContentLoaded', () => {

    let listTemplate = document.querySelector('#template_list');
    let listContainer = document.querySelector('.lists-container');

    const listController = new ListController();




    document.querySelector('#addList').addEventListener('click', () => {
        const clone = listTemplate.content.cloneNode(true);
        listContainer.append(clone);

        listController.initializeList(listContainer.querySelector('.table-list:last-child'));
    })
});