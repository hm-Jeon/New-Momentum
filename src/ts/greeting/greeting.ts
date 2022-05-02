import template from "./greeting.template";

const USERNAME_KEY = "username";

export default class Greeting {
  private container: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
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

  private editUsername = (input: HTMLElement, eventType: string): EventListener => {
    if (eventType === "keypress") {
      return ((event: KeyboardEvent): void => {
        if (event.key === "Enter") {
          event.preventDefault();
          const newUsername: string = input.innerText;

          localStorage.setItem(USERNAME_KEY, newUsername);
          this.render();
        }
      }) as EventListener;
    } else {
      return ((event: FocusEvent): void => {
        event.preventDefault();
        const newUsername: string = input.innerText;

        localStorage.setItem(USERNAME_KEY, newUsername);
        this.render();
      }) as EventListener;
    }
  };

  private maxlengthContenteditable = (e: any) => {
    const maxLength = 15;
    const currentTextLength = e.target.innerText.length;
    if (currentTextLength === maxLength && e.keyCode != 8) {
      e.preventDefault();
    }
  };

  private render = () => {
    const username = localStorage.getItem(USERNAME_KEY);
    const hasData = !!username;

    this.container.innerHTML = template({
      hasData: hasData,
      greetingMessage: this.getGreetingMessage(),
      username: username,
    });

    if (!hasData) {
      const form: HTMLFormElement = this.container.querySelector("form") as HTMLFormElement;
      form.addEventListener("submit", this.inputUsername);
    } else {
      const deleteBtn: HTMLElement = this.container.querySelector("i") as HTMLElement;
      deleteBtn.addEventListener("click", this.deleteUsername);

      const input: HTMLElement = this.container.querySelector(".input") as HTMLElement;
      input.addEventListener("keypress", this.editUsername(input, "keypress"));
      input.addEventListener("focusout", this.editUsername(input, "focusout"));
      input.addEventListener("keypress", this.maxlengthContenteditable);
    }
  };
}
