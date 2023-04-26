class DatabaseController {
    #db = null;

    async init() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open("ListDB", 2);
            request.onerror = (e) => {
                reject(false);
                console.log(e);
                alert(lang.dbError);
            }
            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("email", "email", { unique: true });
                this.#db = event.target.result;
                resolve(true);
            }
            request.onsuccess = (e) => {
                this.#db = e.target.result;
                resolve(true);
            }
        });
    }

    testWrite() {
        // const objectStore = this.#db.createObjectStore("customers", { keyPath: "ssn" });
        // objectStore.createIndex("name", "name", { unique: false });
        // objectStore.createIndex("email", "email", { unique: true });
        //
        // objectStore.transaction.oncomplete = (event) => {



        const customerData = [
            { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
            { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
        ];


        const transaction = this.#db.transaction(["customers"], "readwrite");

        // Do something when all the data is added to the database.
        transaction.oncomplete = (event) => {
            console.log("All done!");
        };

        transaction.onerror = (event) => {
            // Don't forget to handle errors!
        };



        const objectStore = transaction.objectStore("customers");
        customerData.forEach((customer) => {
            const request = objectStore.add(customer);
            request.onsuccess = (event) => {
                // event.target.result === customer.ssn;
            };
        });
        // };
    }
}