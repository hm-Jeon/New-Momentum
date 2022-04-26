const template = `
<div>
  {{#dailyWeatherList}}
  <div class="day">
    <div class="info">
      <div class="icon">
        <i class="{{icon}}"></i>
      </div>
      <div class="dayOfWeek">
        <span>{{dayOfWeek}}</span>
      </div>
    </div>
    <div class="temp">
      <div class="min">
        <span>{{minTemp}}</span>
      </div>
      <div class="max">
        <span>{{maxTemp}}</span>
      </div>
    </div>
  </div>
  {{/dailyWeatherList}}
</div>  
`;

export default Handlebars.compile(template);
