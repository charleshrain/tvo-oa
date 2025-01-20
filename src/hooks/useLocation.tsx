import {useState} from "react";
import {Location, WeatherData} from "@/types/Types";

export function useLocation() {
    const  [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    return {selectedLocation, setSelectedLocation, weatherData, setWeatherData};
}