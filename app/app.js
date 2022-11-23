import { elementsModal, elements } from './base.js'
import { openEditTaskModal, saveEditTaskModal } from './view/viewModal.js';
import { updateTable } from './view/viewTable.js';
import { addTask, deleteTask, loadTask } from './view/viewTask.js';


elements.body.onload = function att() {
  loadTask();
  updateTable();
};

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (elements.input.value != '') {
    addTask();
    updateTable();
  } else {
    alert('teste')
  }

});

elements.table.addEventListener('click', (event) => {
  const { className } = event.target;
  const { indice } = event.target.dataset;

  if (className.includes('edit')) {
    openEditTaskModal(indice)
  }

  if (className.includes('delete')) {
    deleteTask(indice);
    updateTable();
    loadTask();
  }
});

elementsModal.btnEdit.addEventListener('click', (event) => {
  
  const input = elementsModal.inputEdit.value;

  if (input != '') {
    saveEditTaskModal(input)
  }

  elementsModal.modal.hide();
});