import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmploymentTypeFilter } from "../../store/slices/JobSlice";
import type { RootState } from "../../store/store";
import "./EmploymentTypeSelection.css";

export default function EmploymentTypeSelection() {
    const dispatch = useDispatch();
    const employmentType = useSelector(
        (state: RootState) => state.jobs.employmentTypeFilter
    );

    const handleEmploymentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setEmploymentTypeFilter(e.target.value)); // Skicka den valda filtreringsstatusen till Redux store
    };
    return (
        <select
            className="employment-selection"
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
    );
}
