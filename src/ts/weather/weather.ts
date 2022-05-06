import currentWeatherTemplate from "./current_weather.template";
import dailyWeatherTemplate from "./daily_weather.template";
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
  private currentWeatherContainer: HTMLElement;
  private dailyWeatherContainer: HTMLElement;

  constructor(currentWeatherContainer: string, dailyWeatherContainer: string) {
    this.currentWeatherContainer = (
      document.querySelector(currentWeatherContainer) as HTMLElement
    ).querySelector(".content") as HTMLElement;

    this.dailyWeatherContainer = (
      document.querySelector(dailyWeatherContainer) as HTMLElement
    ).querySelector(".content") as HTMLElement;

    navigator.geolocation.getCurrentPosition(this.GeoOk);
  }

  GeoOk = (position: WeatherObj): void => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.renderCurrentWeather(lat, lon);
    this.renderDailyWeather(lat, lon);
  };

  private getCurrentWeather = async (lat: number, lon: number): Promise<WeatherObj> => {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${METRIC_KEY}`;
    const data: WeatherObj = (await axios.get(url)).data;

    return data;
  };

  private renderCurrentWeather = async (lat: number, lon: number): Promise<void> => {
    const data: WeatherObj = await this.getCurrentWeather(lat, lon);

    this.render(this.currentWeatherContainer, currentWeatherTemplate, {
      temp: `${Math.round(data.main.temp)}°`,
      status: data.weather[0].main,
      city: data.name,
      icon: iconMap[data.weather[0].icon],
    });
  };

  private getDailyWeather = async (lat: number, lon: number): Promise<WeatherObj[]> => {
    const exclude = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}&units=${METRIC_KEY}`;
    const dataList: WeatherObj = (await axios.get(url)).data.daily;
    const dailyWeatherList: WeatherObj[] = [];

    dataList.forEach((data: WeatherObj, index: number) => {
      if (index < 5) {
        const dayofWeek = new Date(data.dt * 1000).toLocaleDateString("en", {
          weekday: "short",
        });

        const dailyWeather: WeatherObj = {
          dayOfWeek: index === 0 ? "Today" : index === 1 ? "Tomorrow" : dayofWeek,
          minTemp: `${Math.round(data.temp.min)}°`,
          maxTemp: `${Math.round(data.temp.max)}°`,
          icon: iconMap[data.weather[0].icon],
        };

        dailyWeatherList.push(dailyWeather);
      }
    });

    return dailyWeatherList;
  };

  private renderDailyWeather = async (lat: number, lon: number): Promise<void> => {
    const dailyWeatherList: WeatherObj[] = await this.getDailyWeather(lat, lon);

    this.render(this.dailyWeatherContainer, dailyWeatherTemplate, {
      dailyWeatherList: dailyWeatherList,
    });
  };

  private render = (
    target: HTMLElement,
    template: HandlebarsTemplateDelegate,
    data: WeatherObj
  ): void => {
    target.innerHTML = template(data);
  };
}
