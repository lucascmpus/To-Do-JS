export const elements = {
  body: document.querySelector('body'),

  // Inputs
  input: document.getElementById('input-name-task'),
  table: document.getElementById('table-body'),

  // Form
  form: document.getElementById('form-task'),
    
  todo: []
}

export const elementsModal = {
  modal: new bootstrap.Modal(document.getElementById('edit-modal')),

  inputEdit: document.getElementById('modal-edit-task-name'),
  btnEdit: document.getElementById('save-edit-task'),

  taskNumber: document.getElementById('task-number'),
  indexEditTask: document.getElementById('index-edit-task'),
}

