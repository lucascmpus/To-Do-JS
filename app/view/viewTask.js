import { elements } from '../base.js'

export const renderTask = (nameTask, statusTask, indice) => {
  const row = document.createElement('tr');
  
  row.innerHTML = `
  <th data-indice=${indice} >${nameTask}</th>
  <td data-indice=${indice}>${statusTask}</td>

  <th>
      <button data-indice=${indice} id="edit-${indice}" type="button" class="edit btn btn-primary btn-warning btn-sm">Editar</button>
  </th>

  <th>
      <button data-indice=${indice} id="delete-${indice}" type="button" class="delete btn btn-danger btn-sm">Excluir</button>
  </th>
  `;

  elements.table.appendChild(row);
};

export const loadTask = () => {
  elements.table.innerHTML = '';
  elements.todo = JSON.parse(localStorage.getItem('todolist')) ?? [];
  
  elements.todo.forEach((item, indice) => {
    renderTask(item.item, item.status, indice)
  });
};


export const addTask = () => {
  elements.todo.push({
    'item': elements.input.value,
    'status': elements.status.value,
  });
  
  localStorage.setItem('todolist', JSON.stringify(elements.todo));
};