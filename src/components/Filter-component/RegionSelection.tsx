
import "./RegionSelection.css"
import regions from '../../regions/regions.json';
import type { Region } from '../../types/types';

export default function RegionSelection({ handleFilterChange }: any) {
    return (
        <select
            className="region-selection"
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
    );
}
