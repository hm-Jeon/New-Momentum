import template from "./greeting.template";

export default class Greeting {
  private container: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;

    this.render();
    (this.container.querySelector("form") as HTMLFormElement).addEventListener(
      "submit",
      this.inputName
    );
  }

  private inputName = (event: SubmitEvent) => {
    event.preventDefault();
    const username: string = (this.container.querySelector("input") as HTMLInputElement).value;
    localStorage.setItem("username", username);

    this.render();
  };

  private render = () => {
    const username = localStorage.getItem("username");
    const hasData = !!username;

    this.container.innerHTML = template({
      hasData: hasData,
      greeting_message: `Welcome! ${username}`,
    });
  };
}
