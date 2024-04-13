import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "../../types/types";

export interface JobState {
    jobs: Job[];
    filteredJobs: Job[];
    search: string;
    municipality: string;
    employmentTypeFilter: string;
    offset: number;
}

const initialState: JobState = {
    jobs: [],
    filteredJobs: [],
    search: "",
    municipality: "",
    employmentTypeFilter: "", // Lägg till en ny variabel för att spara filtreringsstatusen för heltid, deltid eller alla jobb
    offset: 0,
};

export const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setReduxJobs: (state, action: PayloadAction<Job[]>) => {
            state.jobs = action.payload;
        },
        resetJobs: (state) => {
            state.jobs = [];
        },
        reduxSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setReduxMunicipality: (state, action: PayloadAction<string>) => {
            state.municipality = action.payload;
        },
        setEmploymentTypeFilter: (state, action: PayloadAction<string>) => {
            // Skapa en ny reducer för att uppdatera filtreringsstatusen för heltid, deltid eller alla jobb
            state.employmentTypeFilter = action.payload;
        },
        sortJobsByEmploymentType: (state) => {
            const employmentType = state.employmentTypeFilter;
            if (employmentType === "Heltid") {
                state.filteredJobs = state.jobs.filter(
                    (job) => job.working_hours_type.label === "Heltid"
                );
            } else if (employmentType === "Deltid") {
                state.filteredJobs = state.jobs.filter(
                    (job) => job.working_hours_type.label === "Deltid"
                );
            } else {
                state.filteredJobs = [];
            }
        },
        resetFilteredJobs: (state) => {
            state.filteredJobs = [];
        },
    },
});

export const {
    setReduxJobs,
    reduxSearch,
    setReduxMunicipality,
    setEmploymentTypeFilter,
    sortJobsByEmploymentType,
    resetJobs,
    resetFilteredJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;
