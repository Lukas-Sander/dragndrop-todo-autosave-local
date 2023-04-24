// import('components/DatabaseController');

document.addEventListener('DOMContentLoaded', () => {

    const main = async() => {


        const listController = new ListController();
        const langController = new Language();

        const dbController = new DatabaseController();
        const test = await dbController.init();


        dbController.testWrite();

        langController.setLanguage('de');

        document.querySelector('#addList').addEventListener('click', () => {
            listController.addList();
        })
    };

    main();
});