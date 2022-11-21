import { elementsModal, elements } from './base.js'
import { updateTable } from './view/viewTable.js';
import { addTask, loadTask } from './view/viewTask.js';


elements.body.onload = function att() {
  loadTask();
  updateTable();
};

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (elements.input.value != '' && elements.status.value != 1) {
    addTask();
    updateTable();
  } else {
    alert('teste')
  }

});


