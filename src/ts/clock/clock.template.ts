const template = `
  <div class="AM_PM">
    <span class="AM">AM</span>
    <span class="PM">PM</span>
  </div>
  <span class="time">{{time}}</span>
  <div class="toggle">
    <i class="fa-solid fa-clock-rotate-left"></i>
  </div>
`;

export default Handlebars.compile(template);
