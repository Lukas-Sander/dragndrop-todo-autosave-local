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

    document.querySelector('.export').innerText = JSON.stringify(data);
    notify('Export in Textfeld!');

}

function save() {
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

    localStorage.setItem('todo', JSON.stringify(data));
    notify('Gespeichert!');
}
function load() {
    let storage = localStorage.getItem('todo');
    if(!storage) {
        return;
    }
    storage = JSON.parse(storage);
    document.querySelector('#list').innerHTML = storage.html;

    document.querySelectorAll('form tbody tr').forEach((e, i) => {
        e.querySelectorAll('input, textarea').forEach((v, ib) => {
            if(v.type == 'checkbox') {
                v.checked = (storage.form[i][ib]);
            }
            else {
                v.value = (storage.form[i][ib]);
            }
        });
    });
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
        e.closest('tr').remove();
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

document.addEventListener('DOMContentLoaded', () => {
    load();
    autoSave();

    document.querySelector('form').addEventListener('submit', (e) => {
        e.stopPropagation();
        e.preventDefault();
    });


    let template = document.querySelector('#template_todo');
    let container = document.querySelector('#list');
    let sortable = new Sortable(container, {
        handle: '.handle',
        animation: 150
    });

    document.querySelector('#addRow').addEventListener('click', ()=> {
        const clone = template.content.cloneNode(true);
        container.append(clone);

        sortable = new Sortable(container, {
            handle: '.handle',
            animation: 150
        });
    });
});