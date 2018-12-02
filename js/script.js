const form = document.querySelector('form');
const taskText = document.querySelector('#taskText');
const emptyAlert = document.querySelector('.empty-alert');
const taskList = document.querySelector('.task-list');
const clearBtn = document.querySelector('.clear-btn');


function isValid(){
    if (taskText.value == '') {
        taskText.classList.add('is-invalid');
        return false;
    } else {
        taskText.classList.remove('is-invalid');
        return true;
    }
}

function addTask () {
    let HTML = `<li class="list-group-item d-flex align-items-center"><span>${taskText.value}</span><i class="fas fa-edit edit-item ml-auto"></i><i class="fas fa-trash-alt delete-item ml-4"></i></li>`;
    taskList.insertAdjacentHTML("afterBegin", HTML);
    taskText.value = '';
    isShowEmpty();
    showNotif('alert-success', 'задача добавлена');
}

function edit(el){
    el = el.parentNode;
    for (const elem of el.children) {
        if (elem.nodeName == 'SPAN'){
            el = elem;
            break;
        }
    }
    el.setAttribute('contenteditable', 'true');
    el.focus();
}

function save(el){
    el = el.parentNode;
    for (const elem of el.children) {
        if (elem.nodeName == 'SPAN'){
            el = elem;
            break;
        }
    }
    el.removeAttribute('contenteditable');
    showNotif('alert-success', 'задача сохранена');
}

function del (el){
    el.parentNode.remove();
    showNotif('alert-warning', 'задача удалена');
}

function isShowEmpty(){
    if (taskList.children.length){
        emptyAlert.style.display = 'none';
    } else {
        emptyAlert.style.display = 'block';
    }
}

function showNotif (clas, text) {
    const notif = document.querySelector(`.${clas}`);
    notif.innerHTML = text;
    notif.style.display = 'block';
    setTimeout(function(){
        notif.style.display = 'none';
    }, 2000);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(isValid()){
        addTask();
    }
});

taskText.addEventListener("input", (e) => {
    isValid(e);
});


taskList.addEventListener("click", function (e){
    const target = e.target;
    if (target.classList.contains('fa-save')){
        target.classList.remove('fa-save');
        save(target);
    } else if (target.classList.contains('edit-item')){
        target.classList.add('fa-save');
        edit(target);
    }

    if (target.classList.contains('delete-item')){
        del(target);
        isShowEmpty();
    }
});


clearBtn.addEventListener("click", () => {
    taskList.innerHTML = '';
    isShowEmpty();
    showNotif('alert-warning', 'все задачи удалены');
});





