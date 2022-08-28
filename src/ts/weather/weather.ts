import currentWeatherTemplate from "./current_weather.template";
import dailyWeatherTemplate from "./daily_weather.template";
import {
  CurrentWeatherDataObj,
  CurrentWeatherObj,
  DailyWeatherDataObj,
  DailyWeatherObj,
  PositionObj,
} from "../types";
import axios from "axios";

const API_KEY = "1ef5279831e294aefc64dfb9b55f20a1";
const METRIC_KEY = "metric";

const iconMap: { [key: string]: string } = {
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

  GeoOk = (position: PositionObj): void => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.renderCurrentWeather(lat, lon);
    this.renderDailyWeather(lat, lon);
  };

  private getCurrentWeather = async (lat: number, lon: number): Promise<CurrentWeatherDataObj> => {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${METRIC_KEY}`;
    const data: CurrentWeatherDataObj = (await axios.get(url)).data;

    return data;
  };

  private renderCurrentWeather = async (lat: number, lon: number): Promise<void> => {
    const data: CurrentWeatherDataObj = await this.getCurrentWeather(lat, lon);

    const currentWeather: CurrentWeatherObj = {
      temp: `${Math.round(data.main.temp)}°`,
      status: data.weather[0].main,
      city: data.name,
      icon: iconMap[data.weather[0].icon],
    };

    this.render(this.currentWeatherContainer, currentWeatherTemplate, {
      currentWeather,
    });
  };

  private getDailyWeather = async (lat: number, lon: number): Promise<DailyWeatherObj[]> => {
    const exclude = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}&units=${METRIC_KEY}`;
    const dataList: DailyWeatherDataObj[] = (await axios.get(url)).data.daily;
    const dailyWeatherList: DailyWeatherObj[] = [];

    dataList.forEach((data: DailyWeatherDataObj, index: number) => {
      if (index < 5) {
        const dayofWeek = new Date(data.dt * 1000).toLocaleDateString("kr", {
          weekday: "long",
        });

        const dailyWeather: DailyWeatherObj = {
          dayOfWeek: index === 0 ? "오늘" : index === 1 ? "내일" : dayofWeek,
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
    const dailyWeatherList: DailyWeatherObj[] = await this.getDailyWeather(lat, lon);

    this.render(this.dailyWeatherContainer, dailyWeatherTemplate, {
      dailyWeatherList,
    });
  };

  private render = (
    target: HTMLElement,
    template: HandlebarsTemplateDelegate,
    data: { [key: string]: DailyWeatherObj[] } | { [key: string]: CurrentWeatherObj }
  ): void => {
    target.innerHTML = template(data);
  };
}
