import template from "./clock.template";

const AM_CLASS: string = ".AM";
const PM_CLASS: string = ".PM";
const DATE_CLASS: string = ".date span";
const TIME_CLASS: string = ".time";
const TOGGLE_CLASS: string = ".toggle i";
const ACTIVE_KEY: string = "active";
const IS_12HOURS_SYSTEM_KEY = "is12HoursSystem";

export default class Clock {
  private template: HandlebarsTemplateDelegate = template;
  private container: HTMLElement;
  private dateSpan: HTMLElement;
  private timeSpan: HTMLElement;
  private toggleBtn: HTMLElement;
  private is12HoursSystem: boolean;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.render();

    this.dateSpan = this.container.querySelector(DATE_CLASS) as HTMLElement;
    this.renderDate(this.getDate());

    this.is12HoursSystem = this.getStoredHoursSystem();

    this.timeSpan = this.container.querySelector(TIME_CLASS) as HTMLElement;
    this.renderTime(this.getTime());

    this.toggleBtn = this.container.querySelector(TOGGLE_CLASS) as HTMLElement;
    this.toggleBtn.addEventListener("click", this.toggleHoursSystem);
  }

  // Date
  private getDate = (): string => {
    const date: Date = new Date();
    const dayofWeek = date.toLocaleDateString("kr", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return dayofWeek;
  };

  private renderDate = (now: string): void => {
    this.dateSpan.innerHTML = now;
  };

  // Time
  private getStoredHoursSystem = (): boolean => {
    return !localStorage.getItem(IS_12HOURS_SYSTEM_KEY)
      ? true
      : localStorage.getItem(IS_12HOURS_SYSTEM_KEY) === "true"
      ? true
      : false;
  };

  private toggleHoursSystem = () => {
    this.is12HoursSystem = !this.is12HoursSystem;
    localStorage.setItem(IS_12HOURS_SYSTEM_KEY, String(this.is12HoursSystem));
    this.renderTime(this.getTime());
  };

  private getTime = (): string => {
    const date: Date = new Date();
    const hours: string = this.getHours(date);
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    const time: string = `${hours}:${minutes}`;

    return time;
  };

  private getHours = (date: Date): string => {
    return this.is12HoursSystem
      ? this.convertTo12HoursSystem(date.getHours())
      : String(date.getHours()).padStart(2, "0");
  };

  private convertTo12HoursSystem = (hours: number): string => {
    const AMorPM: string = hours >= 12 ? "PM" : "AM";

    this.toggleAMPM(AMorPM);

    return String(hours % 12) === "0" ? "12" : String(hours % 12);
  };

  private toggleAMPM(AMorPM: string): void {
    const AM: HTMLElement = this.container.querySelector(AM_CLASS) as HTMLElement;
    const PM: HTMLElement = this.container.querySelector(PM_CLASS) as HTMLElement;

    if (AMorPM === "AM") {
      AM.classList.add(ACTIVE_KEY);
      PM.classList.remove(ACTIVE_KEY);
    } else {
      AM.classList.remove(ACTIVE_KEY);
      PM.classList.add(ACTIVE_KEY);
    }
  }

  private renderTime = (now: string): void => {
    this.timeSpan.innerHTML = now;

    const AM_PM: HTMLElement = this.container.querySelector(".AM_PM") as HTMLElement;
    if (this.is12HoursSystem) {
      AM_PM.classList.add(ACTIVE_KEY);
    } else {
      AM_PM.classList.remove(ACTIVE_KEY);
    }
  };

  // Re-rendering
  private reRenderClock = (): Function => {
    return (timeNow: string = this.getTime(), dateNow: string = this.getDate()) => {
      if (this.timeSpan.innerHTML !== timeNow) {
        this.renderTime(timeNow);
      }

      if (this.dateSpan.innerHTML !== dateNow) {
        this.renderDate(dateNow);
      }
    };
  };

  // Initial Rendering
  private render = (): void => {
    this.container.innerHTML = this.template({});

    setInterval(this.reRenderClock(), 1000);
  };
}
