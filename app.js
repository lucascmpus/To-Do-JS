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
    todoList.forEach((item)=>{
        insertTaskWindow(item.item, item.status)
    })
}

// update table
const updateTable = () => {
    localStorage.setItem('todolist', JSON.stringify(todoList))
    loadTasks()
}

// insert task 
const insertTaskWindow = (item, status) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <th>${item}</th>
    <td onclick="attStatus(${item})">${status}</td>

    <td>
        <button type="button" class="btn btn-primary btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Editar
        </button>
    </td>

    <td>
        <button onclick="deleteTask(${item})" type="button" class="btn btn-danger btn-sm">Excluir</button>
    </td>
    ` 
    rowBody.appendChild(row)
    inputAdd.value = ''
}

// delete
const deleteTask = (item) => {
    var list = JSON.parse(localStorage.getItem('todolist')).filter(items => items.item != item);
    localStorage.setItem('todolist', JSON.stringify(list))    
    loadTasks()
}

// att status
const attStatus = (item) =>{
    var list = JSON.parse(localStorage.getItem('todolist'))
    var itemx = item.toString()
    list.forEach((items) => {
        if(items.item == itemx && items.status == "Fazer"){
            items.item = itemx;
            items.status = "Fazendo"
        }
        else if (items.item == itemx && items.status == "Fazendo"){
            items.item = itemx;
            items.status = "Concluido"
        }
        else if (items.item == itemx && items.status == "Concluido"){
            items.item = itemx;
            items.status = "Fazer"
        }
    })
    localStorage.setItem('todolist', JSON.stringify(list))
    loadTasks()    
}

// test edit button
const editTask = (item) => {
    console.log(item)
    var valorEditInput = editInput.value;
    var list = JSON.parse(localStorage.getItem('todolist'))

    list.filter(items => items.item != item)

    localStorage.setItem('todolist', JSON.stringify(list))
    loadTasks()   
}


// events to add task
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

