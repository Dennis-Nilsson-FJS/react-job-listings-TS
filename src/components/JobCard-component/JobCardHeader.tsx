import "./JobCardHeader.css"

type JobCardHeaderProps = {
    headline: string;
    employer: string;
    city: string;
    occupation: string;
    postedAt: string;
    employmentType: string;
    url: string;
    backupURL: string;
};

function JobCardHeader({
    headline,
    employer,
    city,
    occupation,
    postedAt,
    employmentType,
    url,
    backupURL,
}: JobCardHeaderProps) {
    return (
        <div className="basic-info-container">
            <div className="job-info-container">
                <a className="headline-url" href={url ? url : backupURL}>
                    {headline ? headline : ""}
                </a>
                <p className="employer-name">
                    {employer} - {city}
                </p>
                <p>{occupation ? occupation : ""}</p>
                <div style={{ display: "flex", gap: "16px" }}>
                    <p>{postedAt ? `Publicerad: ${postedAt}` : ""}</p>
                    <p>{employmentType}</p>
                </div>
            </div>
        </div>
    );
}

export default JobCardHeader;
