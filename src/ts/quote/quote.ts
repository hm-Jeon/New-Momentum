import axios from "axios";
import template from "./quote.template";

const QUOTE_TEXT_CLASS: string = ".text";

export default class Quote {
  container: HTMLElement;
  quoteTextSpan: HTMLElement;
  url: string = "https://api.adviceslip.com/advice";

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.render();

    this.quoteTextSpan = this.container.querySelector(QUOTE_TEXT_CLASS) as HTMLElement;
    this.renderQuote();
  }

  private getRandomQuote = async (): Promise<string> => {
    const data: string = (await axios.get(this.url)).data.slip.advice;
    return data;
  };

  private renderQuote = async (): Promise<void> => {
    const quote = await this.getRandomQuote();
    this.quoteTextSpan.innerHTML = quote;
  };

  private render = () => {
    this.container.innerHTML = template({});

    setInterval(this.renderQuote, 30000);
  };
}
