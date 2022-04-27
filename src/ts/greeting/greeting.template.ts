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
    <i class="fa-solid fa-delete-left"></i>
  </div>
  {{else}}
  <form>
    <input type="text" placeholder="Please input your name" maxlength="20" spellcheck="false" />
  </form>
  {{/if}}
`;

export default Handlebars.compile(template);
