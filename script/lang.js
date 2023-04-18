const lang_en = {
    "lang": "de",
    "task": "task",
    "prio": "priority",
    "start": "start",
    "end": "end",
    "mentaleffort": "mental effort",
    "notes": "notes"
};

const lang_de = {
    lang: "de",
    "task": "Aufgabe",
    "prio": "Priorität",
    "start": "Beginn",
    "end": "Ende",
    "mentaleffort": "Denkaufwand",
    "notes": "Notizen"
};

function reloadLanguages() {
    document.querySelectorAll('.lang[data-tag]').forEach((e) => {
        e.innerText = lang_de[e.dataset.tag];
    });

    document.querySelectorAll('template').forEach((e) => {
        e.content.querySelectorAll('.lang[data-tag]').forEach((e) => {
            e.innerText = lang_de[e.dataset.tag];
        });
    })
}

document.addEventListener('DOMContentLoaded', ()=> {
    reloadLanguages();
});