import { useEffect, useState } from "react";
import FilterRegion from "../components/Filter-component/FilterRegion";
import JobCards from "../components/JobCards-component/JobCards";
import {
    setReduxJobs,
    sortJobsByEmploymentType,
} from "../store/slices/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";



function JobListing() {
    const dispatch = useDispatch();
    const limit = 20;
    const [loading, setLoading] = useState<boolean>(false);
    const searchQuery: string = useSelector(
        (state: RootState) => state.jobs.search
    );
    const municipality: string = useSelector(
        (state: RootState) => state.jobs.municipality
    );
    const jobs = useSelector((state: RootState) => state.jobs.jobs);
    const [openCardId, setOpenCardId] = useState<number | null>(null);
    const employmentTypeFilter = useSelector(
        (state: RootState) => state.jobs.employmentTypeFilter
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `https://jobsearch.api.jobtechdev.se/search?limit=${limit}`;

                if (searchQuery) {
                    url += `&q=${searchQuery}`;
                }
                if (municipality) {
                    url += `&municipality=${municipality}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                console.log(data.hits);
                dispatch(setReduxJobs(data.hits));
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery || municipality) {
            fetchData();
        }
    }, [searchQuery, municipality, dispatch]);

    useEffect(() => {
        // Sortera jobb baserat på anställningstyp när filter ändras
        dispatch(sortJobsByEmploymentType());
    }, [employmentTypeFilter, dispatch]);

    const handleOpenCard = (id: number) => {
        setOpenCardId(openCardId === id ? null : id);
    };

    return (
        <main>
            <FilterRegion />
            {loading && <h1>Laddar...</h1>}
            {!loading && jobs.length === 0 && <h1>Inget sökresultat</h1>}
            {!loading &&
                jobs.map((job, index: number) => (
                    <JobCards
                        employmentType={job.working_hours_type.label}
                        handleOpenCard={handleOpenCard}
                        isOpen={openCardId === index}
                        id={index}
                        key={job.id}
                        employer={job.employer.name}
                        logo={job.logo_url}
                        city={job.workplace_address.municipality}
                        occupation={job.occupation.label}
                        url={job.application_details.url}
                        backupURL={job.webpage_url}
                        headline={job.headline}
                        postedAt={job.publication_date.slice(0, 10)}
                        description={job.description.text_formatted}
                    />
                ))}
        </main>
    );
}

export default JobListing;
