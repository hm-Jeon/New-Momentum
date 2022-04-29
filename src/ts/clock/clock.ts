import template from "./clock.template";

const AM_CLASS: string = ".AM";
const PM_CLASS: string = ".PM";
const TIME_CLASS: string = ".time";
const ACTIVE_KEY: string = "active";

export default class Clock {
  private template: HandlebarsTemplateDelegate = template;
  private container: HTMLElement;
  private timeSpan: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.render();

    this.timeSpan = this.container.querySelector(TIME_CLASS) as HTMLElement;
    this.renderTime(this.getTime());
  }

  private getTime = (): string => {
    const date: Date = new Date();
    let hours: string = this.getAM_PM(date.getHours());
    hours = hours === "0" ? "12" : hours;
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    const time: string = `${hours}:${minutes}`;

    return time;
  };

  private getAM_PM = (hours: number): string => {
    const AM: HTMLElement = this.container.querySelector(AM_CLASS) as HTMLElement;
    const PM: HTMLElement = this.container.querySelector(PM_CLASS) as HTMLElement;

    const AM_PM: string = hours > 12 ? "PM" : "AM";

    if (AM_PM === "AM") {
      AM.classList.add(ACTIVE_KEY);
      PM.classList.remove(ACTIVE_KEY);
    } else {
      AM.classList.remove(ACTIVE_KEY);
      PM.classList.add(ACTIVE_KEY);
    }

    return String(hours % 12);
  };

  private renderTime = (now: string): void => {
    this.timeSpan.innerHTML = now;
  };

  private reRenderTime = (): Function => {
    return (now: string = this.getTime()) => {
      if (this.timeSpan.innerHTML !== now) {
        this.renderTime(now);
      }
    };
  };

  private render = (): void => {
    this.container.innerHTML = this.template({});

    setInterval(this.reRenderTime(), 1000);
  };
}
