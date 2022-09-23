const buttonAdd = document.getElementById('addTask');
const inputAdd = document.getElementById('inputText');
const selectStatus = document.getElementById('selectStatus');
const rowBody = document.getElementById('tbody');
const editInput = document.getElementById('newName');

var todoList = [];

// pre load 
const att = () => {
    loadTasks();
    updateTable();
}

// add task
const addTask = () => {
    todoList.push({'item': inputAdd.value, 'status': selectStatus.value})
    localStorage.setItem('todolist', JSON.stringify(todoList))
}

// load task
const loadTasks = () => {
    rowBody.innerHTML = '';
    todoList = JSON.parse(localStorage.getItem('todolist')) ?? []
    todoList.forEach((item, indice)=>{
        insertTaskWindow(item.item, item.status, indice)
    })
}

// update table
const updateTable = () => {
    localStorage.setItem('todolist', JSON.stringify(todoList))
    loadTasks()
}

// insert task 
const insertTaskWindow = (item, status, indice) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <th data-indice=${indice} >${item}</th>
    <td data-indice=${indice}>${status}</td>

    <th>
        <button data-indice=${indice} id="edit" type="button" class="btn btn-primary btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Editar
        </button>
    </th>

    <th>
        <button data-indice=${indice} id="delete" type="button" class="btn btn-danger btn-sm">Excluir</button>
    </th>
    ` 
    rowBody.appendChild(row)
    inputAdd.value = ''
}




// att status
const attStatux = (item) =>{
    var list = JSON.parse(localStorage.getItem('todolist'))
    list.forEach((items) => {
        if(items.item == item && items.status == "Fazer"){
            items.item = item;
            items.status = "Fazendo"
        }
        else if (items.item == item && items.status == "Fazendo"){
            items.item = item;
            items.status = "Concluido"
        }
        else if (items.item == item && items.status == "Concluido"){
            items.item = item;
            items.status = "Fazer"
        }
    })
    localStorage.setItem('todolist', JSON.stringify(list))
    loadTasks()    
}

// deleteTask and attStatus
const deletarTarefa = (indice) => {
    todoList.splice(indice,1)
    updateTable();
    loadTasks()
}

const attStatus = (index,textContent) =>{
    var list = JSON.parse(localStorage.getItem('todolist'))
    
    if (textContent == 'Fazer'){
        list.forEach((items, indice) =>{
            if(items.status == 'Fazer' && indice == index){
                items.status = 'Fazendo'
            }
        })
        localStorage.setItem('todolist', JSON.stringify(list))
        loadTasks()
    } else if (textContent == 'Fazendo'){
        list.forEach((items, indice) =>{
            if(items.status == 'Fazendo' && indice == index){
                items.status = 'Concluido'
            }
        })
        localStorage.setItem('todolist', JSON.stringify(list))
        loadTasks()
    } else if (textContent == 'Concluido'){
        list.forEach((items, indice) =>{
            if(items.status == 'Concluido' && indice == index){
                items.status = 'Fazer'
            }
        })
        localStorage.setItem('todolist', JSON.stringify(list))
        loadTasks()
    }
}

const clickItem = (e) => {
    const elemento = e.target;
    
    if (elemento.id == 'delete'){
        const indice = elemento.dataset.indice;
        deletarTarefa(indice)
    } 

    if (elemento.tagName == 'TD'){
        const index = elemento.dataset.indice;
        const textContent = elemento.textContent;
        attStatus(index, textContent)
    }       
    
}


// events to add task

document.getElementById('table').addEventListener('click', clickItem)

buttonAdd.addEventListener('click', function () {
    if(inputAdd.value != '' && selectStatus.value != 1){
        addTask();
        updateTable()
    } else {
         alert('Adicione uma tarefa e um status.')
    }
})

inputAdd.addEventListener('keypress', function (e){
    if (e.key === 'Enter' && inputAdd.value != '' && selectStatus.value != 1 ){
        addTask();
        updateTable()
    } else if (e.key === 'Enter' && inputAdd.value != '' && selectStatus.value == 1 ){
        alert('Adicione uma tarefa e um status.')
    } else if (e.key === 'Enter' && inputAdd.value == '' && selectStatus.value != 1 ){
        alert('Adicione uma tarefa e um status.')
    }
    
})

