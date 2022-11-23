import { elementsModal } from "../base.js"
import { loadTask } from "./viewTask.js";

export const openEditTaskModal = (index) => {
  elementsModal.taskNumber.innerText = parseInt(index);
  elementsModal.modal.show();
}

export const saveEditTaskModal = () => {
  const list = JSON.parse(localStorage.getItem('todolist'));

  const taskNumber = Number(elementsModal.taskNumber.textContent);

  list.forEach((items, index) => {
    if (index == taskNumber) {
      items.item = elementsModal.inputEdit.value;
    };   
  });

  localStorage.setItem('todolist', JSON.stringify(list));
  elementsModal.inputEdit.value = '';
  loadTask();
}