'use client'
import React from 'react';
import LocationInput from "@/components/LocationInput";
import {fetchWeatherData} from "@/services/apiService";
import WeatherDisplay from "@/components/WeatherDisplay";
import {Location, WeatherData} from "@/types/Types";
import {useLocation} from "@/hooks/useLocation";
import {fallbackWeatherData} from "@/constants/fallbackWeatherData";

function App() {



    const {setSelectedLocation, weatherData, setWeatherData} = useLocation();

    const handleLocationSelect = async (location: Location): Promise<void> => {
        setSelectedLocation(location);
        const weather: WeatherData = await fetchWeatherData(location);
        setWeatherData(weather);
    };

    return (
        <section className={"flex flex-col"}>
                <LocationInput onSelectLocation={handleLocationSelect}/>
                <WeatherDisplay weatherData={weatherData || fallbackWeatherData}/>
        </section>
    );
}

export default App;
