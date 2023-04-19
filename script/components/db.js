class Database {
    constructor() {
        this.db = null;
    }

    init() {
        const request = window.indexedDB.open("ListDB");

        request.onerror = (e) => {
            console.log(e);
            alert(lang.dbError);
        }
        request.onsuccess = (e) => {
            this.db = e.target.result;
        }
    }
}