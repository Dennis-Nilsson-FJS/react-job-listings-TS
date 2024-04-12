import "./FilterContainer.css";
import EmploymentTypeSelection from "./EmploymentTypeSelection";
import MunicipalitySelection from "./MunicipalitySelection";
import RegionSelection from "./RegionSelection";
import { useState, ChangeEvent } from "react";
import regions from "../../regions/regions.json";
import { useDispatch } from "react-redux";
import { setReduxMunicipality } from "../../store/slices/JobSlice";
import type { Region } from "../../types/types";

export default function FilterRegion() {
    const dispatch = useDispatch();
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [municipalities, setMunicipalities] = useState<string[]>([]);
  
    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedRegionValue = e.target.value;
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


    return (
        <div className="selection-container">
            <RegionSelection handleFilterChange={handleFilterChange} />
            <MunicipalitySelection
                selectedRegion={selectedRegion}
                municipalities={municipalities}
            />
            {window.location.pathname === "/" ? (
                ""
            ) : (
                <EmploymentTypeSelection />
            )}
        </div>
    );
}
