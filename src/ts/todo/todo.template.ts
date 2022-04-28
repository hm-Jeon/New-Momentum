const template = `
  {{#todos}}
  <div class="todo" id="{{id}}">
    <div>
      <input class="checkbox" type="checkbox" {{#if checked}}checked{{/if}} />
      <span class="text">{{todo}}</span>
    </div>
    <i class="fa-solid fa-square-minus deleteBtn"></i>
  </div>
  {{/todos}}
`;

export default Handlebars.compile(template);
