import TypeIt from "typeit";
import template from "./todo.template";

const TODOS_KEY = "todos";

interface TodoObj {
  id: number;
  todo: string;
  checked: boolean;
}

export default class Todo {
  private container: HTMLElement;
  private input: HTMLInputElement;
  private todos: TodoObj[];

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.todos = JSON.parse(localStorage.getItem(TODOS_KEY) as string) || [];

    this.input = document.querySelector(".todo-form") as HTMLInputElement;
    this.input.addEventListener("submit", this.writeTodo);

    this.render();
  }

  private writeTodo = (event: SubmitEvent) => {
    event.preventDefault();

    const input: HTMLInputElement = this.input.querySelector("input") as HTMLInputElement;
    const todo: string = input.value;
    input.value = "";
    input.blur();

    const todoId: number = Date.now();

    this.todos.push({
      id: todoId,
      todo: todo,
      checked: false,
    });

    this.saveTodos();
    this.render();

    const text: HTMLElement = document.getElementById(`${todoId}`) as HTMLElement;
    const typeit = new (TypeIt as any)(text.querySelector(".text"), {
      speed: 100,
      waitUntilVisible: true,
      lifeLike: true,
      loop: false,
    }).go();

    const destroyTypeit = setInterval((state: boolean = typeit.is("completed")) => {
      if (state === true) {
        typeit.destroy();
        clearInterval(destroyTypeit);
      }
    }, 500);
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

  private checkHandler = (event: Event) => {
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

  private render = () => {
    this.container.innerHTML = template({ todos: this.todos });

    const deleteBtnList = document.querySelectorAll(".deleteBtn i");
    deleteBtnList.forEach(deleteBtn => {
      deleteBtn.addEventListener("click", this.deleteTodo);
    });

    const checkBoxList = document.querySelectorAll(".todo .checkbox");
    checkBoxList.forEach(checkBox => {
      checkBox.addEventListener("change", this.checkHandler);
    });
  };
}
