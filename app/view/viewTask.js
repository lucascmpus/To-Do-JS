import { elements, elementsModal } from '../base.js'

export const renderTask = (nameTask, indice) => {
  const row = document.createElement('tr');

  row.innerHTML = `
  <th data-indice=${indice} >${nameTask}</th>
  <th>
      <button data-bs-target="edit-modal" data-indice=${indice} id="edit-${indice}" type="button" class="edit btn btn-primary btn-warning btn-sm">Editar</button>
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
    renderTask(item.item, indice)
  });
};


export const addTask = () => {
  elements.todo.push({
    'item': elements.input.value,
  });

  localStorage.setItem('todolist', JSON.stringify(elements.todo));
};

export const deleteTask = (indice) => {
  elements.todo.splice(indice, 1);
}

