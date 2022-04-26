import current_weather_template from "./current_weather.template";
import daily_weather_template from "./daily_weather.template";
import axios from "axios";

const API_KEY = "1ef5279831e294aefc64dfb9b55f20a1";
const METRIC_KEY = "metric";

interface WeatherObj {
  [key: string]: any;
}

const iconMap: WeatherObj = {
  "01d": "fa-solid fa-sun",
  "02d": "fa-solid fa-cloud-sun",
  "03d": "fa-solid fa-cloud",
  "04d": "fa-solid fa-cloud",
  "09d": "fa-solid fa-cloud-showers-heavy",
  "10d": "fa-solid fa-cloud-sun-rain",
  "11d": "fa-solid fa-cloud-bolt",
  "13d": "fa-solid fa-snowflake",
  "50d": "fa-solid fa-smog",
  "01n": "fa-solid fa-moon",
  "02n": "fa-solid fa-cloud-moon",
  "03n": "fa-solid fa-cloud",
  "04n": "fa-solid fa-cloud",
  "09n": "fa-solid fa-cloud-showers-heavy",
  "10n": "fa-solid fa-cloud-moon-rain",
  "11n": "fa-solid fa-cloud-bolt",
  "13n": "fa-solid fa-snowflake",
  "50n": "fa-solid fa-smog",
};

export default class Weather {
  private current_weather_container: HTMLElement;
  private daily_weather_container: HTMLElement;

  constructor(current_weather_container: string, daily_weather_container: string) {
    this.current_weather_container = (
      document.querySelector(current_weather_container) as HTMLElement
    ).querySelector(".content") as HTMLElement;

    this.daily_weather_container = (
      document.querySelector(daily_weather_container) as HTMLElement
    ).querySelector(".content") as HTMLElement;
  }

  GeoOk = (position: WeatherObj) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.renderCurrentWeather(lat, lon);
    this.renderDailyWeather(lat, lon);
  };

  private renderCurrentWeather = async (lat: number, lon: number) => {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${METRIC_KEY}`;
    const data: WeatherObj = (await axios.get(url)).data;

    this.render(this.current_weather_container, current_weather_template, {
      temp: `${Math.round(data.main.temp)}°`,
      status: data.weather[0].main,
      city: data.name,
      icon: iconMap[data.weather[0].icon],
    });
  };

  private renderDailyWeather = async (lat: number, lon: number) => {
    const exclude = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}&units=${METRIC_KEY}`;
    const data: WeatherObj = (await axios.get(url)).data;
    const dailyWeatherList: [WeatherObj?] = [];

    data.daily.forEach((value: WeatherObj, index: number) => {
      if (index < 5) {
        const dayofWeek = new Date(value.dt * 1000).toLocaleDateString("en", {
          weekday: "short",
        });

        const dailyWeather: WeatherObj = {
          dayOfWeek: dayofWeek,
          minTemp: `${Math.round(value.temp.min)}°`,
          maxTemp: `${Math.round(value.temp.max)}°`,
          icon: iconMap[value.weather[0].icon],
        };

        dailyWeatherList.push(dailyWeather);
      }
    });

    this.render(this.daily_weather_container, daily_weather_template, {
      dailyWeatherList: dailyWeatherList,
    });
  };

  private render = (
    target: HTMLElement,
    template: HandlebarsTemplateDelegate,
    data: WeatherObj
  ) => {
    target.innerHTML = template(data);
  };
}
