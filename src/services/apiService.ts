import {Location, WeatherData} from "@/types/Types";

// Get unique location suggestions based on user input
export async function fetchLocationSuggestions(query: string): Promise<Location[]> {
    const locationQuery = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=20&appid=${process.env.API_KEY}`;
    const response = await fetch(locationQuery);
    const locations: Location[] = await response.json();

    // Ensure unique value in response, duplicates present in view when using coordinates as map key
    const uniqueLocations = new Map<string, Location>();
    locations.forEach(location => {
        const uniqueKey = `${location.lat},${location.lon}`;
        if (!uniqueLocations.has(uniqueKey)) {
            uniqueLocations.set(uniqueKey, location);
        }
    });

    return Array.from(uniqueLocations.values());
}

// Fetch weather data given the coordinates for a specific location
export async function fetchWeatherData(location: Location): Promise<WeatherData> {
    const weatherQuery: string = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${process.env.API_KEY}`;
    const response = await fetch(weatherQuery);
    return await response.json();
}
