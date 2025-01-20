import React from "react";
import {fetchLocationSuggestions} from "@/services/apiService";
import {Location, LocationInputProps} from "@/types/Types";
import {useLocationSelect} from "@/hooks/useLocationSelect";

export default function LocationInput({onSelectLocation}: LocationInputProps) {
    const {inputValue, setInputValue, suggestions, setSuggestions, showDropdown, setShowDropdown} = useLocationSelect();

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInputValue(query);

        if (query.length > 2) {
            const results = await fetchLocationSuggestions(query);
            setSuggestions(results);
            setShowDropdown(true);
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    };

    const handleSelect = (location: Location) => {
        setInputValue(location.name);
        setSuggestions([]);
        setShowDropdown(false);
        onSelectLocation(location);
    };

    const handleBlur = () => {
        // Delay hiding the dropdown to allow click selection
        setTimeout(() => setShowDropdown(false), 200);
    };

    return (
        <div className="flex flex-col max-w-full">
            <input
                name="locationInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
                placeholder={"Enter location"}
                className="max-w-full px-3 py-2  shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />

            {showDropdown && suggestions.length > 0 && (
                <ul
                    className="border shadow-md w-full max-h-48 overflow-y-auto min-w-[300px]"
                    onBlur={handleBlur}
                >
                    {suggestions.map((location: Location) => (
                        <li
                            key={location.lon + " " + location.lat}
                            className="px-3 py-2 bg-black  hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleSelect(location)}
                        >
                            {`${location.name}, ${location.state || "Unknown State"}, ${location.country}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

