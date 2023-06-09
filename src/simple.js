const todoData = 'todoV0-2';

let sortable;
let container;
let template;
let templateDivider;
let lastsavetext;
let textareaButtons;

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

function save(d = null) {
    let data;

    if(d !== null) {
        data = d;
    }
    else {
        data = JSON.stringify(getData());
    }

    localStorage.setItem(todoData, data);
    lastsavetext.innerText = getTime();
}

function getData()
{
    let data = [];

    document.querySelectorAll('.card-container .card').forEach((e, i) => {
        let row = {};
        if(e.classList.contains('divider')) {
            row['type'] = 'divider';
        }
        else {
            row['type'] = 'card';
        }

        let open = e.querySelector('details');
        if(open) {
            row['open'] = open.open;
        }


        let dat = {};

        e.querySelectorAll('input, textarea').forEach((v) => {

            if(v.type == 'checkbox') {
                dat[v.name] = v.checked;
            }
            else {
                dat[v.name] = v.value;
            }

            if(v.type == 'textarea') {
                let subrow = {};
                subrow['height'] = v.style.height;
                subrow['value'] = v.value;
                dat[v.name] = subrow;
            }

        });
        row['data'] = dat;

        data.push(row);
    });

    return data;
}

function load() {
    let storage = localStorage.getItem(todoData);
    if(!storage) {
        return;
    }
    storage = JSON.parse(storage);

    storage.forEach((r)=> {
        if(r.type == 'divider') {
            addRow(templateDivider, true);
        }
        else {
            addRow(template, true);
        }

        let newRow = container.querySelector('.card-container .card:last-child');

        if('open' in r) {
            newRow.querySelector('details').open = r.open;
        }

        for(const [key, value] of Object.entries(r.data)) {
            let input = newRow.querySelector('[name="' + key + '"]');

            if(key == 'taskdone') {
                input.checked = value;

                if(value) {
                    newRow.classList.add('strikethrough')
                }
            }
            else if(typeof value === 'object') {
                input.value = value.value;
                input.style.height = value.height;
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
    }, 5000);
}

function notify(txt) {
    let notifications = document.querySelector('#notifications');
    let msg = document.createElement('P');
    msg.innerText = txt;
    notifications.append(msg);
    setTimeout(() => {
        msg.remove();
    }, 5000);
}

function deleteTask(e) {
    let card = e.closest('.card');
    let name = '';
    if(card.querySelector('[name="taskname"]')) {
        name = card.querySelector('[name="taskname"]').value;
    }
    else if (card.querySelector('[name="dividertext"]')) {
        name = card.querySelector('[name="dividertext"]').value;
    }

    if(confirm('"' + name + '" löschen?')) {
        card.remove();
        save();
    }
}

function strikeRow(e) {
    if(e.checked) {
        e.closest('.card').classList.add('strikethrough');
    }
    else {
        e.closest('.card').classList.remove('strikethrough');
    }
    save();
}

function addRow(t, isloading = false) {
    const clone = t.content.cloneNode(true);
    container.append(clone);

    sortable = new Sortable(container, {
        handle: '.handle',
        animation: 150,
        onEnd: () => {
            save();
        }
    });
    if(!isloading) {
        save();
    }
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

    checkDueCards(today);

    setTimeout(startTime, 1000);
}

function checkDueCards(today) {
    today.setHours(0, 0, 0, 0);
    // console.log(today);
    // console.log(today)
    document.querySelectorAll('.card-container .card:not(.divider)').forEach((e) => {
        let start = e.querySelector('[name="start"]').value;
        let end = e.querySelector('[name="ende"]').value;

        e.classList.remove('status-start-today');
        e.classList.remove('status-start-past');
        e.classList.remove('status-start-future');
        e.classList.remove('status-end-today');
        e.classList.remove('status-end-past');
        e.classList.remove('status-end-future');

        if(start != '')
        {
            start = new Date(start + 'T00:00:00');
            // console.log(start);
            if(start.getTime() == today.getTime()) {
                e.classList.add('status-start-today');
            }
            else if(start < today) {
                e.classList.add('status-start-past');
            }
            else if(start > today) {
                e.classList.add('status-start-future');
            }
        }
        if(end != '')
        {
            end = new Date(end + 'T00:00:00');
            if(end.getTime() == today.getTime()) {
                e.classList.add('status-end-today');
            }
            else if(end < today) {
                e.classList.add('status-end-past');
            }
            else if(end > today) {
                e.classList.add('status-end-future');
            }
        }
    });
}

function getTime() {
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
    return (day + "." + mon + "." + year + " " + h + ":" + m + ":" + s);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function clearBoard() {
    container.innerHTML = '';
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

document.addEventListener('DOMContentLoaded', () => {
    container = document.querySelector('.card-container');
    template = document.querySelector('#template_todo');
    templateDivider = document.querySelector('#template_divider');
    lastsavetext = document.querySelector('.lastsave-data');
    importFile = document.querySelector('#importFile');
    let menuTrigger = document.querySelector('.options-trigger');
    let menuCloseTrigger = document.querySelector('.options-close');

    load();

    let optionsmenu = document.querySelector('.menu');
    let body = document.querySelector('body');

    menuTrigger.addEventListener('click', () => {
        optionsmenu.classList.add('active');
        body.classList.add('body-inactive');
    })
    menuCloseTrigger.addEventListener('click', () => {
        optionsmenu.classList.remove('active');
        body.classList.remove('body-inactive');
    })

    sortable = new Sortable(container, {
        handle: '.handle',
        animation: 150,
        onEnd: () => {
            save();
        }
    });


    document.querySelector('#addRow').addEventListener('click', ()=> {
        addRow(template);
    });

    document.querySelector('#addDivider').addEventListener('click', ()=> {
        addRow(templateDivider);
    });
    document.querySelector('.download-txt').addEventListener('click', (e) => {
        e.preventDefault();
        download("todo.txt",JSON.stringify(getData()));
    });
    document.querySelector('.upload-txt').addEventListener('click', (e) => {
        e.preventDefault();
        if(confirm('Wirklich importieren? Aktuelle Daten werden dadurch überschrieben!')) {
            if(importFile.files.length > 0) {
                let reader = new FileReader();
                reader.readAsText(importFile.files[0]);
                reader.onload = ((e) => {
                    console.log(e.target.result);
                    clearBoard();
                    save(e.target.result);
                    load();
                });
            }
            else {
                alert('Keine Datei für den Import ausgewählt!');
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Escape':
                if(!optionsmenu.classList.contains('active')) {
                    menuTrigger.click();
                }
                else {
                    menuCloseTrigger.click();
                }
                break;
            default:
                break;
        }
    });

    startTime();

    // document.querySelector('#manualstyle').innerHTML = '.card{background:blue;}'

});