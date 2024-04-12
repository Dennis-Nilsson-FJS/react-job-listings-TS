import "./JobCardDescription.css"

type JobCardDescriptionProps = {
    isOpen: boolean;
    description: string;
    isHTML: (str: string) => boolean;
    makeLinksClickable: (text: string) => string;
    url: string;
    backupURL: string;
    logo: string;
};

function JobCardDescription({
    isOpen,
    description,
    isHTML,
    makeLinksClickable,
    url,
    backupURL,
    logo,
}: JobCardDescriptionProps) {
    return (
        <>
            {isOpen && description && (
                <div className="description-container">
                    <strong>Beskrivning:</strong>
                    <br />
                    <br />
                    {isHTML(description) ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    ) : (
                        <p
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{
                                __html: makeLinksClickable(description),
                            }}
                        />
                    )}
                    <div className="apply-logo-container">
                        <a className="apply-btn" href={url ? url : backupURL}>
                            Ansök här!
                        </a>
                        {logo && <img src={logo} alt="bild på logga" />}
                    </div>
                </div>
            )}
        </>
    );
}

export default JobCardDescription;
