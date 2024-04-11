import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "../../types/types";

export interface JobState {
    jobs: Job[];
    search: string;
    municipality: string;
    employmentTypeFilter: string;
}

const initialState: JobState = {
    jobs: [],
    search: "",
    municipality: "",
    employmentTypeFilter: "", // Lägg till en ny variabel för att spara filtreringsstatusen för heltid, deltid eller alla jobb
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
            switch (state.employmentTypeFilter) {
                case "heltid":
                    state.jobs.sort((a, b) => {
                        if (
                            a.working_hours_type.label &&
                            b.working_hours_type.label
                        ) {
                            return 0;
                        }
                        if (a.working_hours_type.label) {
                            return 1;
                        }
                        if (b.working_hours_type.label) {
                            return -1;
                        }
                        return b.working_hours_type.label.localeCompare(
                            a.working_hours_type.label
                        );
                    });
                    break;
                case "deltid":
                    state.jobs.sort((a, b) => {
                        if (
                            a.working_hours_type.label &&
                            b.working_hours_type.label
                        ) {
                            return 0;
                        }
                        if (a.working_hours_type.label) {
                            return 1;
                        }
                        if (b.working_hours_type.label) {
                            return -1;
                        }
                        return a.working_hours_type.label.localeCompare(
                            b.working_hours_type.label
                        );
                    });
                    break;
                default:
                    // Ingen sortering krävs för andra fall, behåll ursprunglig ordning
                    break;
            }
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
} = jobsSlice.actions;

export default jobsSlice.reducer;
