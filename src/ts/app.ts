import template from "./app.template";
import Clock from "./clock/clock";

const CLOCK_CLASS: string = ".clock";

(document.querySelector(".root") as HTMLElement).innerHTML = template({});

const clock = new Clock(CLOCK_CLASS);
clock.render();
