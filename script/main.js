document.addEventListener('DOMContentLoaded', () => {

    let listTemplate = document.querySelector('#template_list');
    let listContainer = document.querySelector('.lists-container');


    

    document.querySelector('#addList').addEventListener('click', () => {
        const clone = listTemplate.content.cloneNode(true);
        listContainer.append(clone);

        initializeList(listContainer.querySelector('.table-list:last-child'));
    })
});