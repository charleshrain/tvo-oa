// constants/fallbackWeatherData.ts
import { WeatherData } from "@/types/Types";

export const fallbackWeatherData: WeatherData = {
    coord: {
        lon: "-",
        lat: "-"
    },
    weather: [
        {
            id: 800,
            main: "-",
            description: "-",
            icon: "",
        },
    ],
    base: "-",
    main: {
        temp: "-" ,
        feels_like: "-",
        temp_min: "-",
        temp_max: "-",
        pressure: "-",
        humidity: "-",
    },
    visibility: "-",
    wind: {
        speed: "-",
        deg: "-",
    },
    clouds: {
        all: "-",
    },
    dt: "-",
    sys: {
        type: "-",
        id: "-",
        country: "XX",
        sunrise: "-",
        sunset: "-",
    },
    timezone: "-",
    id: "-",
    name: "Unknown",
    cod: "-",
};
