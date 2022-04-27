import template from "./greeting.template";

const USERNAME_KEY = "username";

export default class Greeting {
  private container: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.render();
  }

  private inputUsername = (event: SubmitEvent) => {
    event.preventDefault();
    const username: string = (this.container.querySelector("input") as HTMLInputElement).value;
    localStorage.setItem(USERNAME_KEY, username);

    this.render();
  };

  private deleteUsername = (event: Event) => {
    localStorage.removeItem(USERNAME_KEY);

    this.render();
  };

  private editUsername = (input: HTMLElement) => {
    return (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const newUsername: string = input.innerText;

        localStorage.setItem(USERNAME_KEY, newUsername);
        this.render();
      }
    };
  };

  private render = () => {
    const username = localStorage.getItem(USERNAME_KEY);
    const hasData = !!username;

    this.container.innerHTML = template({
      hasData: hasData,
      greetingMessage: "Welcome!",
      username: username,
    });

    if (!hasData) {
      const form: HTMLFormElement = this.container.querySelector("form") as HTMLFormElement;
      form.addEventListener("submit", this.inputUsername);
    } else {
      const deleteBtn: HTMLElement = this.container.querySelector("i") as HTMLElement;
      deleteBtn.addEventListener("click", this.deleteUsername);

      const input: HTMLElement = this.container.querySelector(".input") as HTMLElement;
      input.addEventListener("keypress", this.editUsername(input));
    }
  };
}
