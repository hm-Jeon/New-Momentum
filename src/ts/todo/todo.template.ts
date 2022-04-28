const template = `
  {{#todos}}
  <div class="todo" id="{{id}}">
    <div>
      <input class="checkbox" type="checkbox" {{#if checked}}checked{{/if}} />
      <div>
        <span class="text">{{todo}}</span>
      </div>
    </div>
    <div class="deleteBtn">
      <i class="fa-solid fa-square-minus"></i>
    </div>
  </div>
  {{/todos}}
`;

export default Handlebars.compile(template);
