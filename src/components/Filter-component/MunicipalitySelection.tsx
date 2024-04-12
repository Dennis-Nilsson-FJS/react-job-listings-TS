import "./MunicipalitySelection.css"
import regions from "../../regions/regions.json";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setReduxMunicipality } from "../../store/slices/JobSlice";
import type { Region } from "../../types/types";

type MunicipalityProps = {
    selectedRegion: string;
    municipalities: string[];
};

export default function MunicipalitySelection({
    selectedRegion,
    municipalities,
}: MunicipalityProps) {
    const dispatch = useDispatch();

    const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedMunicipalityValue = event.target.value;
        dispatch(setReduxMunicipality(selectedMunicipalityValue));
    };
    return (
        <select
            className="municipality-selection"
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
                            (regions as Region)[selectedRegion]?.municipalities[
                                municipality
                            ]
                        }
                    </option>
                ))
            ) : (
                <option disabled>Inga tillgängliga kommuner</option>
            )}
        </select>
    );
}
