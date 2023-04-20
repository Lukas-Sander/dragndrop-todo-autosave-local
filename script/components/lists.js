class ListController {
    #listTemplate = document.querySelector('#template_list');
    #listContainer = document.querySelector('.lists-container');

    #initializeList(listNode) {
        console.log(listNode);
    }

    addList() {
        const clone = this.#listTemplate.content.cloneNode(true);
        this.#listContainer.append(clone);

        this.#initializeList(this.#listContainer.querySelector('.table-list:last-child'));
    }
}

