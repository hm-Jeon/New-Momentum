export interface PositionObj {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface CurrentWeatherDataObj {
  main: {
    temp: number;
  };
  name: string;
  weather: {
    main: string;
    icon: string;
  }[];
}

export interface CurrentWeatherObj {
  temp: string;
  status: string;
  city: string;
  icon: string;
}

export interface DailyWeatherDataObj {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    icon: string;
  }[];
}

export interface DailyWeatherObj {
  dayOfWeek: string;
  minTemp: string;
  maxTemp: string;
  icon: string;
}
