const template = `
  <div class="date">
    <span>{{date}}</span>
  </div>
  <div class="clockDiv">
    <div class="AM_PM">
      <span class="AM">AM</span>
      <span class="PM">PM</span>
    </div>
    <span class="time"></span>
    <div class="toggle">
      <i class="fa-solid fa-clock-rotate-left"></i>
    </div>
  </div>
`;

export default Handlebars.compile(template);
