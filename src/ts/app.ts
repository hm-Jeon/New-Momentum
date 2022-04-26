import template from "./app.template";
import Clock from "./clock/clock";
import Weather from "./weather/weather";

const CLOCK_CLASS: string = ".clock";
const CURRENT_WEATHER_CLASS: string = ".current-weather";
const DAILY_WEATHER_CLASS: string = ".daily-weather";

(document.querySelector(".root") as HTMLElement).innerHTML = template({});

const clock = new Clock(CLOCK_CLASS);
clock.render();

const weather = new Weather(CURRENT_WEATHER_CLASS, DAILY_WEATHER_CLASS);
navigator.geolocation.getCurrentPosition(weather.GeoOk);
