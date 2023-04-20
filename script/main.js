document.addEventListener('DOMContentLoaded', () => {

    const main = async() => {


    const listController = new ListController();
    const langController = new Language();
    const dbController = new DatabaseController();

    const test = await dbController.init();
    console.log(test);

    console.log(dbController);


        dbController.testWrite();

    langController.setLanguage('de');

    document.querySelector('#addList').addEventListener('click', () => {
        listController.addList();
    })
    };

    main();
});