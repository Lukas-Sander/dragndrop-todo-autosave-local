class Language {
    #en = {
        lang: "de",
        task: "task",
        prio: "priority",
        start: "start",
        end: "end",
        mentaleffort: "mental effort",
        notes: "notes",
        dbError: "Database connection error!",
        newListBtn: 'new list'
    };

    #de = {
        lang: "de",
        task: "Aufgabe",
        prio: "Priorität",
        start: "Beginn",
        end: "Ende",
        mentaleffort: "Denkaufwand",
        notes: "Notizen",
        dbError: "Datenbankfehler!",
        newListBtn: 'Neue Liste'
    };

    #active = this.#en;

    constructor() {
        this.#reloadLanguage();
    }

    /**
     *
     * @param lang
     */
    setLanguage(lang) {
        switch(lang) {
            case 'de':
                this.#active = this.#de;
                break;
            case 'en':
                this.#active = this.#en;
                break;
            default:
                break;
        }
        this.#reloadLanguage();
    }

    #reloadLanguage() {
        document.querySelectorAll('.lang[data-tag]').forEach((e) => {
            e.innerText = this.#active[e.dataset.tag];
        });

        document.querySelectorAll('template').forEach((e) => {
            e.content.querySelectorAll('.lang[data-tag]').forEach((e) => {
                e.innerText = this.#active[e.dataset.tag];
            });
        })
    }
}
