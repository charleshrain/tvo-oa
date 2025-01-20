import React from 'react';
import Image from 'next/image';
import { WeatherDisplayProps } from "@/types/Types";

function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
    let imgSrc;
    if (weatherData.weather[0].icon) {
        imgSrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
    } else {
        imgSrc = "https://pic.onlinewebfonts.com/thumbnails/icons_542000.svg";
    }

    return (
        <div className="border rounded-b-lg shadow-md p-4 w-full h-full mx-auto bg-white">
            {/* Today's Weather Section */}
            <div className="today-weather text-gray-600">
                <div className="flex justify-between items-center flex-wrap">
                    <h3 className="text-lg font-semibold">Today&#39;s Weather</h3>
                    <span className="text-sm">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <p>{weatherData.weather[0].description}</p>
                <strong>
                    <strong>Hi: {weatherData.main.temp_max} °C</strong> &nbsp; &nbsp; <strong>Lo: {weatherData.main.temp_min} °C</strong>
                </strong>
            </div>

            {/* Current Weather Section */}
            <div className=" mt-2">
                <div className="flex justify-between flex-wrap">
                    <h2 role="heading" className="text-2xl font-bold content-center">Current Temp: {weatherData.main.temp}°C</h2>
                    <div className="relative w-16 h-16">
                        <Image
                            src={imgSrc}
                            alt={"weather image: " + weatherData.weather[0].description || "Weather icon"}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                <div className="additional-info grid grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
                    {/* col 1 */}
                    <div>Feels: <strong>{weatherData.main.feels_like} °C</strong></div>
                    <div>Wind: <strong>{weatherData.wind.speed} km/h</strong></div>
                    {/* col 2 */}
                    <div>Baro: <strong>{weatherData.main.pressure } hPa</strong></div>
                    <div>Humidity: <strong>{weatherData.main.humidity} %</strong></div>
                    {/* col 3 */}
                    <div>Clouds: <strong>{weatherData.clouds.all} %</strong></div>
                </div>
            </div>
        </div>
    );
}

export default WeatherDisplay;
