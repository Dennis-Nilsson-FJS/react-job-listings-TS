import { useState, ChangeEvent, FormEvent } from "react";
import FilterRegion from "../components/Filter-component/FilterRegion";
import { useNavigate, useLocation } from "react-router-dom";
import { reduxSearch } from "../store/slices/JobSlice";
import { useDispatch } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(reduxSearch(searchTerm));
        navigate("/joblisting");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleClearInput = () => {
        setSearchTerm("");
    };

    return (
        <main
            style={
                location.pathname === "/"
                    ? {
                          backgroundImage: "url('./assets/workplace.jpg')",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          height: "100vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                      }
                    : {}
            }
        >
            <form id="search-container" onSubmit={handleSubmit}>
                <div id="input-container">
                    <input
                        className="search-input"
                        type="text"
                        onChange={handleChange}
                        value={searchTerm}
                        placeholder="Search..."
                    />
                    {searchTerm && (
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
            </form>
            <FilterRegion />
        </main>
    );
}
