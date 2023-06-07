class Database {
    constructor() {
        this.db = new Dexie('Todo-Database');

        this.db.version(4).stores({
            task: '++id',
            option: '&name'
        });
        this.db.open().catch(function (e) {
            console.error("DB open failed: " + e.stack);
        })
    }

    /**
     * loads all tasks from the database, as it assumes no tasks are currently loaded
     */
    loadAllTasks() {
        let arr = {};
        return new Promise((resolve) => {
            this.db.transaction('rw', this.db.task, function () {
                this.db.task
                    .each(t => {
                        arr[t.order] = t;
                    })
                    .then(() => {
                        resolve(arr);
                    });
                ;
            }).catch (function (e) {
                resolve(false);
            });
        });
    }

    /**
     * adds a single Task to the database. returns the ID of the saved task
     * @param t - task data to add
     */
    async addTask(t) {
        return new Promise((resolve) => {
            this.db.transaction('rw', this.db.task, function () {
                this.db.task
                    .add(t)
                    .then(id => {
                        resolve(id);
                    });
                ;
            }).catch (function (e) {
                resolve(false);
            });
        });
    }

    /**
     * updates an existing task in the database
     * returns 0 if nothing was found to update
     * @param id - id of the task to update
     * @param t - task data to change
     */
    updateTask(id, t) {
        return new Promise((resolve) => {
            this.db.transaction('rw', this.db.task, function () {
                this.db.task
                    .update(id, t)
                    .then(updated => {
                        resolve(updated);
                    });
                ;
            }).catch (function (e) {
                resolve(false);
            });
        });
    }

    /**
     * deletes a single task in the database
     * returns undefined no matter if deletion occured
     * @param id - id of the task to delete
     */
    deleteTask(id) {
        return new Promise((resolve) => {
            this.db.transaction('rw', this.db.task, function () {
                this.db.task
                    .delete(id)
                    .then(d => {
                        resolve(d);
                    });
                ;
            }).catch (function (e) {
                resolve(false);
            });
        });
    }

    /**
     * writes the default options into the database
     */
    prefillDefaultOptions() {
        //TODO: prefillDefaultOptions
    }

    /**
     * loads options from database
     */
    loadOptions() {
        let arr = [];
        return new Promise((resolve) => {
            this.db.transaction('rw', this.db.option, function () {
                this.db.task
                    .each(t => {
                        arr.push(t);
                    })
                    .then(() => {
                        resolve(arr);
                    });
                ;
            }).catch (function (e) {
                resolve(false);
            });
        });
    }

    /**
     * changes a single option in the database
     * @param option - option identifier to change
     * @param value - new value
     */
    changeOption(option, value) {
        //TODO: changeOption
    }
}