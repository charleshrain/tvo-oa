export type Location = {
    name: string;
    local_names: {
        [key: string]: string; // Dynamic keys with string values for local names
    };
    lat: number;
    lon: number;
    country: string;
    state: string;
};

export type LocationInputProps = {
    onSelectLocation: (location: Location) => Promise<void>;
};

export type WeatherData = {
    coord: {
        lon: number | string;
        lat: number | string ;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number | string;
        feels_like: number | string;
        temp_min: number | string;
        temp_max: number | string;
        pressure: number | string;
        humidity: number | string;
        sea_level?: number | string; // Optional, as it may not always be present
        grnd_level?: number | string; // Optional, as it may not always be present
    };
    visibility: number | string;
    wind: {
        speed: number | string;
        deg: number | string;
    };
    clouds: {
        all: number | string;
    };
    dt: number | string;
    sys: {
        type: number | string;
        id: number | string;
        country: string;
        sunrise: number | string;
        sunset: number | string;
    };
    timezone: number | string;
    id: number | string;
    name: string;
    cod: number | string;
};

export type WeatherViewData = WeatherData | null

export interface WeatherDisplayProps {
    weatherData: WeatherData;
}