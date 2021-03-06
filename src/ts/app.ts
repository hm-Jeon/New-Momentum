import * as Handlebars from "handlebars";

import template from "./app.template";

import Clock from "./clock/clock";
import Weather from "./weather/weather";
import Greeting from "./greeting/greeting";
import Todo from "./todo/todo";
import Quote from "./quote/quote";

const ROOT_CLASS: string = ".root";
const CLOCK_CLASS: string = ".clock";
const GREETING_CLASS: string = ".greeting";
const CURRENT_WEATHER_CLASS: string = ".current-weather";
const DAILY_WEATHER_CLASS: string = ".daily-weather";
const TODO_LIST_CLASS: string = ".todo-list";
const QUOTE_CLASS: string = ".quote";

class App {
  container: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.render();
  }

  private render = () => {
    this.container.innerHTML = template({});
  };
}

function main() {
  const app = new App(ROOT_CLASS);
  const clock = new Clock(CLOCK_CLASS);
  const weather = new Weather(CURRENT_WEATHER_CLASS, DAILY_WEATHER_CLASS);
  const greeting = new Greeting(GREETING_CLASS, 15);
  const todo = new Todo(TODO_LIST_CLASS);
  const quote = new Quote(QUOTE_CLASS);
}

document.addEventListener("DOMContentLoaded", main);
