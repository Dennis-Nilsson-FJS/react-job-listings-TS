import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
    reduxSearch,
    resetFilteredJobs,
    setEmploymentTypeFilter,
} from "../../../store/slices/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

import { FaSearch, FaTimes } from "react-icons/fa";
import "./Search.css";
import Suggestions from "./Suggestions-component/Suggestions";
import type { JobSuggestions } from "../../../types/types";

function Search() {
    const dispatch = useDispatch();
    const initialSearchTerm = useSelector(
        (state: RootState) => state.jobs.search
    );
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        let isMounted: boolean = true;

        const fetchSuggestions = async (inputValue: string) => {
            try {
                const response = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${inputValue}&limit=5`
                );
                const data: { hits: JobSuggestions[] } = await response.json();

                const uniqueSuggestions = data.hits
                    .map((job: JobSuggestions) =>
                        job.occupation_group.label.replace(/\s*m\.fl\.\s*$/, "")
                    )
                    .filter((value: string, index: number, self: string[]) => {
                        return self.indexOf(value) === index;
                    });

                if (isMounted) {
                    setSuggestions(uniqueSuggestions);
                }
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            }
        };

        if (searchTerm.trim() !== "") {
            fetchSuggestions(searchTerm);
        } else {
            setSuggestions([]);
        }

        return () => {
            isMounted = false;
        };
    }, [searchTerm]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        dispatch(reduxSearch(suggestion));
        setSearchTerm(suggestion);
        setIsFocused(false);
        setSuggestions([]);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetFilteredJobs());
        dispatch(reduxSearch(searchTerm));
        setSuggestions([]);
        dispatch(setEmploymentTypeFilter(""));
        /* setSearchTerm(""); */
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 150);
    };
    const handleClearInput = () => {
        setSearchTerm("");
        /* dispatch(reduxSearch("")); */
    };

    return (
        <form
            id="search-container"
            onSubmit={handleSubmit}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
        >
            <div id="input-container">
                <input
                    className="search-input"
                    type="text"
                    onChange={handleChange}
                    value={searchTerm}
                    placeholder="Search..."
                />
                {searchTerm && ( // Visa bara ikonen om inputrutan inte är tom
                    <button
                        className="clearButton"
                        type="button"
                        onClick={handleClearInput}
                    >
                        <FaTimes className="clearIcon" />
                    </button>
                )}
                <button id="search-button" type="submit">
                    <FaSearch id="search-icon" />
                </button>
            </div>
            {isFocused && suggestions.length > 0 && (
                <Suggestions
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
            )}
        </form>
    );
}

export default Search;
