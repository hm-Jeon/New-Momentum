import template from "./todo.template";
import { TodoObj } from "../types";

const TODOS_KEY = "todos";

export default class Todo {
  private container: HTMLElement;
  private form: HTMLInputElement;
  private todos: TodoObj[];

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.todos = JSON.parse(localStorage.getItem(TODOS_KEY) as string) || [];

    this.form = document.querySelector(".todo-form") as HTMLInputElement;
    this.form.addEventListener("submit", this.writeTodo);

    this.render();
  }

  private writeTodo = (event: SubmitEvent) => {
    event.preventDefault();

    const input: HTMLInputElement = this.form.querySelector("input") as HTMLInputElement;
    const todo: string = input.value;
    input.value = "";
    input.blur();

    const todoId: number = Date.now();

    this.todos.push({
      id: todoId,
      todo,
      checked: false,
    });

    this.saveTodos();
    this.render();
  };

  private deleteTodo = (event: Event) => {
    const todo: HTMLElement = (event.target as HTMLElement).closest(".todo") as HTMLElement;
    const todoId: number = +todo.id;

    this.todos = this.todos.filter(todo => {
      return todo.id !== todoId;
    });

    this.saveTodos();
    this.render();
  };

  private checkEventHandler = (event: Event) => {
    const todo: HTMLElement = (event.target as HTMLElement).closest(".todo") as HTMLElement;
    const todoId: number = +todo.id;
    const checkBox = event.target as HTMLInputElement;

    this.todos.forEach(todo => {
      if (todo.id === todoId) {
        todo.checked = checkBox.checked;
      }
    });

    this.saveTodos();
    this.render();
  };

  private saveTodos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(this.todos));
  };

  private setEventHandler = (): void => {
    const deleteBtnList = this.container.querySelectorAll(".deleteBtn");
    deleteBtnList.forEach(deleteBtn => {
      deleteBtn.addEventListener("click", this.deleteTodo);
    });

    const checkBoxList = this.container.querySelectorAll(".todo .checkbox");
    checkBoxList.forEach(checkBox => {
      checkBox.addEventListener("change", this.checkEventHandler);
    });
  };

  private render = () => {
    this.container.innerHTML = template({ todos: this.todos });

    this.setEventHandler();
  };
}
