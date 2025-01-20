import React, {useState, useEffect, useRef} from "react";
import {fetchLocationSuggestions} from "@/services/apiService";
import {Location, LocationInputProps} from "@/types/Types";
import {useLocationSelect} from "@/hooks/useLocationSelect";

export default function LocationInput({onSelectLocation}: LocationInputProps) {
    const {
        inputValue,
        setInputValue,
        suggestions,
        setSuggestions,
        showDropdown,
        setShowDropdown,
    } = useLocationSelect();
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

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
        setFocusedIndex(null); // Reset focus on input change
    };

    const handleSelect = (location: Location) => {
        setInputValue(location.name);
        setSuggestions([]);
        setShowDropdown(false);
        onSelectLocation(location);
    };

    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown || suggestions.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setFocusedIndex((prev) =>
                    prev === null || prev === suggestions.length - 1 ? 0 : prev + 1
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setFocusedIndex((prev) =>
                    prev === null || prev === 0 ? suggestions.length - 1 : prev - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (focusedIndex !== null) {
                    handleSelect(suggestions[focusedIndex]);
                }
                break;
            case "Escape":
                setShowDropdown(false);
                break;
        }
    };

    useEffect(() => {
        if (listRef.current && focusedIndex !== null) {
            const item = listRef.current.children[focusedIndex] as HTMLElement;
            item?.scrollIntoView({block: "nearest"});
        }
    }, [focusedIndex]);

    return (
        <div className="flex flex-col max-w-full">
            <input
                name="locationInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                aria-label="inputbox for geo selection"
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                aria-expanded={showDropdown}
                placeholder={"Enter location"}
                className="max-w-full px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />

            {showDropdown && suggestions.length > 0 && (
                <ul
                    ref={listRef}
                    className="border shadow-md w-full max-h-48 overflow-y-auto min-w-[300px] bg-black"
                    role="listbox"
                >
                    {suggestions.map((location: Location, index: number) => (
                        <li
                            key={location.lon + " " + location.lat}
                            className={`px-3 py-2 ${
                                focusedIndex === index
                                    ? "bg-gray-700 text-white"
                                    : "bg-black text-white hover:bg-gray-700"
                            } cursor-pointer`}
                            onMouseDown={() => handleSelect(location)}
                            onClick={() => handleSelect(location)}
                            role="option"
                            tabIndex={0}
                            aria-selected={focusedIndex === index}
                        >
                            {`${location.name}, ${location.state || "Unknown State"}, ${location.country}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
