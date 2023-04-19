const lang_en = {
    "lang": "de",
    "task": "task",
    "prio": "priority",
    "start": "start",
    "end": "end",
    "mentaleffort": "mental effort",
    "notes": "notes",
    dbError: "Database connection error!"
};

const lang_de = {
    lang: "de",
    "task": "Aufgabe",
    "prio": "Priorität",
    "start": "Beginn",
    "end": "Ende",
    "mentaleffort": "Denkaufwand",
    "notes": "Notizen",
    dbError: "Datenbankfehler!"
};

let lang = lang_de;

function reloadLanguages() {
    document.querySelectorAll('.lang[data-tag]').forEach((e) => {
        e.innerText = lang[e.dataset.tag];
    });

    document.querySelectorAll('template').forEach((e) => {
        e.content.querySelectorAll('.lang[data-tag]').forEach((e) => {
            e.innerText = lang[e.dataset.tag];
        });
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    reloadLanguages();
});