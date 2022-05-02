const template = `
  {{#if hasData}}
  <div>
    <span>
      {{greetingMessage}} 
    </span>
    <span class="input" role="textbox" contenteditable spellcheck="false">
      {{username}}
    </span>
    <span class="period">
      .
    </span>
  </div>
  <i class="fa-solid fa-delete-left"></i>
  {{else}}
  <form>
    <input type="text" placeholder="Please input your name" maxlength="15" spellcheck="false" />
  </form>
  {{/if}}
`;

export default Handlebars.compile(template);
