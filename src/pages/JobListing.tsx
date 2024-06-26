import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterContainer from "../components/Filter-component/FilterContainer";
import JobCard from "../components/JobCard-component/JobCard";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import JobCardSkeleton from "../components/Skeleton/JobCardSkeleton";
import { RootState } from "../store/store";
import {
    setReduxJobs,
    sortJobsByEmploymentType,
} from "../store/slices/JobSlice";

function JobListing() {
    const dispatch = useDispatch();
    const limit = 10;
    const [loading, setLoading] = useState<boolean>(false);
    const searchQuery: string = useSelector(
        (state: RootState) => state.jobs.search
    );
    const municipality: string = useSelector(
        (state: RootState) => state.jobs.municipality
    );
    const jobs = useSelector((state: RootState) => state.jobs.jobs);
    const filteredJobs = useSelector(
        (state: RootState) => state.jobs.filteredJobs
    );
    const [openCardId, setOpenCardId] = useState<number | null>(null);
    const employmentTypeFilter = useSelector(
        (state: RootState) => state.jobs.employmentTypeFilter
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let url = `https://jobsearch.api.jobtechdev.se/search?offset=0&limit=${limit}`;

                if (searchQuery) {
                    url += `&q=${searchQuery}`;
                }
                if (municipality) {
                    url += `&municipality=${municipality}`;
                }
                const res = await fetch(url);
                const data = await res.json();
                dispatch(setReduxJobs(data.hits));
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
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
            <FilterContainer />
            {loading && <JobCardSkeleton />}
            {!loading && jobs.length === 0 && <h1>Inget sökresultat</h1>}
            {!loading &&
                (filteredJobs.length > 0
                    ? filteredJobs.map((job, index: number) => (
                          <JobCard
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
                      ))
                    : jobs.map((job, index: number) => (
                          <JobCard
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
                      )))}
            <BackToTopButton />
        </main>
    );
}

export default JobListing;
