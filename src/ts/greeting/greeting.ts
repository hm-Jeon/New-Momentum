import template from "./greeting.template";

const USERNAME_KEY = "username";

export default class Greeting {
  private container: HTMLElement;
  private maxLength: number;

  constructor(container: string, maxLength: number) {
    this.container = document.querySelector(container) as HTMLElement;
    this.maxLength = maxLength;
    this.render();
  }

  private getGreetingMessage = (): string => {
    const hours = new Date().getHours();

    if (hours < 6 || hours > 21) {
      return "Good night,";
    } else if (hours < 12) {
      return "Good morning,";
    } else if (hours < 18) {
      return "Good afternoon,";
    } else {
      return "Good evening,";
    }
  };

  private inputUsername = (event: SubmitEvent): void => {
    event.preventDefault();
    const username: string = (this.container.querySelector("input") as HTMLInputElement).value;
    localStorage.setItem(USERNAME_KEY, username);
    this.render();
  };

  private deleteUsername = (): void => {
    localStorage.removeItem(USERNAME_KEY);
    this.render();
  };

  private editUsernameByEnter = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newUsername: string = (event.target as HTMLElement).innerText;

      localStorage.setItem(USERNAME_KEY, newUsername);
      this.render();
    }
  };

  private editUsernameByFocusOut = (event: FocusEvent): void => {
    event.preventDefault();
    const newUsername: string = (event.target as HTMLElement).innerText;

    localStorage.setItem(USERNAME_KEY, newUsername);
    this.render();
  };

  private setMaxLength = (event: KeyboardEvent): void => {
    const currentTextLength = (event.target as HTMLElement).innerText.length;
    if (currentTextLength === this.maxLength && event.keyCode != 8) {
      event.preventDefault();
    }
  };

  private setEventHandler = (hasData: boolean): void => {
    if (hasData) {
      const deleteBtn: HTMLElement = this.container.querySelector("i") as HTMLElement;
      deleteBtn.addEventListener("click", this.deleteUsername);

      const input: HTMLElement = this.container.querySelector(".input") as HTMLElement;
      input.addEventListener("keypress", this.editUsernameByEnter);
      input.addEventListener("focusout", this.editUsernameByFocusOut);
      input.addEventListener("keypress", this.setMaxLength);
    } else {
      const form: HTMLFormElement = this.container.querySelector("form") as HTMLFormElement;
      form.addEventListener("submit", this.inputUsername);
    }
  };

  private render = () => {
    const username = localStorage.getItem(USERNAME_KEY);
    const hasData = !!username;

    this.container.innerHTML = template({
      hasData,
      username,
      greetingMessage: this.getGreetingMessage(),
    });

    this.setEventHandler(hasData);
  };
}
