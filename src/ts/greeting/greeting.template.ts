const template = `
  {{#if hasData}}
  <span>{{greetingMessage}} 
    <span class="input" role="textbox" contenteditable spellcheck="false">
      {{username}}
    </span>
    <i class="fa-solid fa-delete-left"></i>
  </span>
  {{else}}
  <form>
    <input type="text" placeholder="Please input your name" />
  </form>
  {{/if}}
`;

export default Handlebars.compile(template);
