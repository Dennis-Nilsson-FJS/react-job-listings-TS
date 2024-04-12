import "./FilterRegion.css";
import { useState, ChangeEvent } from "react";
import regions from "../../regions/regions.json";
import { useDispatch, useSelector } from "react-redux";
import {
    setReduxMunicipality,
    setEmploymentTypeFilter,
} from "../../store/slices/JobSlice";
import type { Region } from "../../types/types";
import { RootState } from "../../store/store";

export default function FilterRegion() {
    const dispatch = useDispatch();
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [municipalities, setMunicipalities] = useState<string[]>([]);
    const employmentType = useSelector(
        (state: RootState) => state.jobs.employmentTypeFilter
    );

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedRegionValue = event.target.value;
        setSelectedRegion(selectedRegionValue);

        if (selectedRegionValue === "all") {
            setMunicipalities([]);
            dispatch(setReduxMunicipality("")); // Nollställ municipality
        } else if (selectedRegionValue) {
            const municipalitiesArray = Object.keys(
                (regions as Region)[selectedRegionValue].municipalities
            );
            setMunicipalities(municipalitiesArray);
        } else {
            setMunicipalities([]);
        }
    };

    const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedMunicipalityValue = event.target.value;
        dispatch(setReduxMunicipality(selectedMunicipalityValue));
    };

    const handleEmploymentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setEmploymentTypeFilter(e.target.value)); // Skicka den valda filtreringsstatusen till Redux store
    };

    return (
        <div className="selection-container">
            <select
                className="location-selection"
                name="region"
                onChange={handleFilterChange}
            >
                <option disabled value="">
                    Välj region
                </option>
                <option value="all">Alla regioner</option>
                {Object.keys(regions).map((region) => (
                    <option value={region} key={region}>
                        {(regions as Region)[region].name}
                    </option>
                ))}
            </select>
            <select
                className="location-selection"
                name="municipalities"
                onChange={handleSelection}
                disabled={!selectedRegion}
            >
                <option disabled value="">
                    Välj kommun
                </option>
                {municipalities.length > 0 ? (
                    municipalities.map((municipality) => (
                        <option value={municipality} key={municipality}>
                            {
                                (regions as Region)[selectedRegion]
                                    ?.municipalities[municipality]
                            }
                        </option>
                    ))
                ) : (
                    <option disabled>Inga tillgängliga kommuner</option>
                )}
            </select>
            {window.location.pathname === "/" ? (
                ""
            ) : (
                <select
                    className="location-selection"
                    id="employment-type"
                    value={employmentType}
                    onChange={handleEmploymentTypeChange}
                >
                    <option disabled value="">
                        Anställningstyp
                    </option>
                    <option value="Alla">Alla</option>
                    <option value="Heltid">Heltid</option>
                    <option value="Deltid">Deltid</option>
                </select>
            )}
        </div>
    );
}
