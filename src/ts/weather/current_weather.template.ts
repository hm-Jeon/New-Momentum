const template = `
  <div> 
    <div class="icon">
      <i class="{{icon}}"></i>
    </div>
    <div class="info">
      <span class="city"><i class="fa-solid fa-location-dot"></i>{{city}}</span>
      <span class="temp">{{temp}}</span>
      <span class="status">{{status}}</span>
    </div>
  </div>
`;

export default Handlebars.compile(template);
