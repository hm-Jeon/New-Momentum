const template = `
  <section class="container">
  <section class="left">
    <div class="current-weather">
      <div class="title">
        <h1>Current Weather</h1>
      </div>
      <div class="content">
      </div>
    </div>
    <div class="daily-weather">
      <div class="title">
        <h1>Daily Weather</h1>
      </div>
      <div class="content">
      </div>
    </div>
  </section>
  <section class="center">
    <div class="greeting">
    </div>
    <div class="clock">
    </div>
    <div class="quote">
    </div>
  </section>
  <section class="right">
    <div class="title">
      <h1>To Do List</h1>
    </div>
    <div class="todo-form">
      <form>
        <input type="text" placeholder="Write new To do" required />
      </form>
    </div>
    <div class="todo-list"></div>
  </section>
  </section>
`;

export default Handlebars.compile(template);
