const template = `
  <div class="AM_PM">
    <span class="AM">AM</span>
    <span class="PM">PM</span>
  </div>
  <span class="time">{{time}}</span>
`;

export default Handlebars.compile(template);
