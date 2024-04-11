// types.d.ts
// types.ts

export type Job = {
    id: string;
    employer: {
        name: string;
    };
    logo_url: string;
    workplace_address: {
        municipality: string;
    };
    working_hours_type: {
        label: string;
    };
    occupation: {
        label: string;
    };
    application_details: {
        url: string;
    };
    webpage_url: string;
    headline: string;
    publication_date: string;
    description: {
        text_formatted: string;
    };
};
