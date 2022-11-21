const buttonAdd = document.getElementById('addTask');
const inputAdd = document.getElementById('inputText');
const selectStatus = document.getElementById('selectStatus');
const rowBody = document.getElementById('tbody');
const editInput = document.getElementById('newName');
const editTaskModal = new bootstrap.Modal(document.getElementById('exampleModal'))

var todoList = [];

// pre load 
const att = () => {
    loadTasks();
    updateTable();
    alert('Para atualizar uma tarefa, clique em seu status!')
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
        <button data-indice=${indice} id="edit-${indice}" type="button" class="edit btn btn-primary btn-warning btn-sm">Editar</button>
    </th>

    <th>
        <button data-indice=${indice} id="delete-${indice}" type="button" class="delete btn btn-danger btn-sm">Excluir</button>
    </th>
    ` 
    rowBody.appendChild(row)
    inputAdd.value = ''
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
    
    if (elemento.className.includes('delete')){
        const indice = elemento.dataset.indice;
        deletarTarefa(indice)
    }
    
    if (elemento.tagName == 'TD'){
        const index = elemento.dataset.indice;
        const textContent = elemento.textContent;
        attStatus(index, textContent)
    }
    
    if (elemento.className.includes('edit')){
        const indice = elemento.dataset.indice;
        openEditTaskModal(indice)
    }
    
    if(elemento.type == 'button' && elemento.textContent== "Editar"){
                        
        
    }
    
}

// edit task

const openEditTaskModal = (indice) => {
    console.log(indice);
    document.getElementById("numero-tarefa").innerText = parseInt(indice) + 1;
    document.getElementById("indice-tarefa-edicao").value = indice;
    editTaskModal.show();
}

document.getElementById("save-edit-task").addEventListener("click", (e) => {
    var nomeTarefa = document.getElementById("edit-modal-nome-tarefa").value;
    var indiceTarefa = document.getElementById("indice-tarefa-edicao").value;
    var descricaoTarefa = "";
    
    var informacoesTarefa = {
        indice: indiceTarefa,
        nome: nomeTarefa,
        descricao: descricaoTarefa
    };
    
    editTask(informacoesTarefa);
})

const editTask = (informacoesTarefa) => {
    var list = JSON.parse(localStorage.getItem('todolist'))
    list.forEach((items) =>{
        items.item = inputValue
    })
    localStorage.setItem('todolist', JSON.stringify(list))
        loadTasks()
}




// events to add task

// document.getElementById('exampleModal').addEventListener('click', clickItem)

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

