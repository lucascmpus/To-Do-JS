const buttonAdd = document.getElementById('addTask');
const inputAdd = document.getElementById('inputText');
const selectStatus = document.getElementById('selectStatus');
const rowBody = document.getElementById('tbody')

var todoList = [];

const att = () => {
    loadTasks();
    updateTable();
}

// add task
const addTask = () => {
    todoList.push({'item': inputAdd.value, 'status': selectStatus.value})
    localStorage.setItem('todolist', JSON.stringify(todoList))
}

const loadTasks = () => {
    rowBody.innerHTML = '';
    todoList = JSON.parse(localStorage.getItem('todolist')) ?? []
    todoList.forEach((item)=>{
        insertTaskWindow(item.item, item.status)
    })
}

const updateTable = () => {
    localStorage.setItem('todolist', JSON.stringify(todoList))
    loadTasks()
}

const insertTaskWindow = (item, status) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <th>${item}</th>
    <td>${status}</td>

    <td>
        <button onclick="editTask()" type="button" class="btn btn-warning btn-sm">Editar</button>
    </td>

    <td>
        <button onclick="deleteTask()" type="button" class="btn btn-danger btn-sm">Excluir</button>
    </td>
    `
    rowBody.appendChild(row)
    inputAdd.value = ''
}

// edit and delete

const editTask = () => {
    console.log('editado...')
}

const deleteTask = () => {
    console.log('deletando...')
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

