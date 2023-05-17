const todoData = 'todoTest';

let sortable;
let container;
let template;

function exportText() {
    let content = document.querySelector('#list').innerHTML;
    let data = {};
    data.html = content;
    data.form = [];

    document.querySelectorAll('form tbody tr').forEach((e, i) => {
        let row = [];
        e.querySelectorAll('input, textarea').forEach((v) => {
            if(v.type == 'checkbox') {
                row.push(v.checked);
            }
            else {
                row.push(v.value);
            }
        });
        data.form.push(row);
    });

    document.querySelector('.export').value = JSON.stringify(data);
    notify('Export in Textfeld!');
}

function importText() {
    let importTxt = document.querySelector('.export').value;
    localStorage.setItem('todo', importTxt);
    notify('Import fertig. Lade Inhalte...')
    load();
}

function save() {
    let data = [];

    document.querySelectorAll('form tbody tr').forEach((e, i) => {
        let row = {};
        e.querySelectorAll('input, textarea').forEach((v) => {

            if(v.type == 'checkbox') {
                row[v.name] = v.checked;
            }
            else {
                row[v.name] = v.value;
            }
        });
        data.push(row);
    });

    localStorage.setItem(todoData, JSON.stringify(data));
    notify('Gespeichert!');
}

function load() {
    let storage = localStorage.getItem(todoData);
    if(!storage) {
        return;
    }
    storage = JSON.parse(storage);

    storage.forEach((r)=> {
        addRow();
        let newRow = container.querySelector('tr:last-child');
        for(const [key, value] of Object.entries(r)) {
            let input = newRow.querySelector('[name="' + key + '"]');

            if(key == 'taskdone') {
                input.checked = value;

                if(value) {
                    newRow.classList.add('strikethrough')
                }
            }
            else {
                input.value = value;
            }

        }
    })
    notify('Geladen!');

}

function autoSave() {
    setTimeout(() => {
        save();
        autoSave();
    }, 30000);
}

function notify(txt) {
    let notifications = document.querySelector('#notifications');
    let msg = document.createElement('P');
    msg.innerText = txt;
    notifications.append(msg);
    setTimeout(() => {
        msg.remove();
    }, 2000);
}

function deleteTask(e) {
    if(confirm('löschen?')) {
        e.closest('.card').remove();
    }
}

function strikeRow(e) {
    if(e.checked) {
        e.closest('tr').classList.add('strikethrough');
    }
    else {
        e.closest('tr').classList.remove('strikethrough');
    }
}

function addRow() {
    const clone = template.content.cloneNode(true);
    container.append(clone);

    sortable = new Sortable(container, {
        handle: '.handle',
        animation: 150
    });
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let day = today.getDate();
    let mon = today.getMonth()+1;
    let year = today.getFullYear();
    day = checkTime(day);
    mon = checkTime(mon);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerText = day + "." + mon + "." + year + " " + h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

document.addEventListener('DOMContentLoaded', () => {
// download("hello.txt","This is the content of my file :)");
    container = document.querySelector('.card-container');
    template = document.querySelector('#template_todo');


    // load();
    // autoSave();


    // document.querySelector('form').addEventListener('submit', (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    // });

    let optionsmenu = document.querySelector('.menu');
    let body = document.querySelector('body');

    document.querySelector('.options-trigger').addEventListener('click', () => {
        optionsmenu.classList.add('active');
        body.classList.add('body-inactive');
    })
    document.querySelector('.options-close').addEventListener('click', () => {
        optionsmenu.classList.remove('active');
        body.classList.remove('body-inactive');
    })

    sortable = new Sortable(container, {
        handle: '.handle',
        animation: 150,
        // filter: '.divider'
    });


    document.querySelector('#addRow').addEventListener('click', ()=> {
        addRow();
    });
    startTime();

});