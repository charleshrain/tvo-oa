import {useState} from "react";
import {Location} from "@/types/Types";

export function useLocationSelect() {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    return {inputValue, setInputValue, suggestions, setSuggestions, showDropdown, setShowDropdown};
}