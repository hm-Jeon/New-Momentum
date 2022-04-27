const template = `
  {{#if hasData}}
  <span>{{greeting_message}}</span>
  {{else}}
  <form>
    <input type="text" placeholder="Please input your name" />
  </form>
  {{/if}}
`;

export default Handlebars.compile(template);
