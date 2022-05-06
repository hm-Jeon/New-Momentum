const template = `
  <div> 
    <div class="icon">
      <i class="{{currentWeather.icon}}"></i>
    </div>
    <div class="info">
    <span class="temp">{{currentWeather.temp}}</span>
    <span class="status">{{currentWeather.status}}</span>
    <span class="city"><i class="fa-solid fa-location-dot"></i>{{currentWeather.city}}</span>
    </div>
  </div>
`;

export default Handlebars.compile(template);
