import { elements } from "../base.js"
import { loadTask } from "./viewTask.js";

export const updateTable = () => {
  localStorage.setItem('todolist', JSON.stringify(elements.todo));
  loadTask();
}