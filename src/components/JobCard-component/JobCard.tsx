import { useState } from "react";
import JobCardHeader from "./JobCardHeader";
import FavoriteButton from "./FavoriteButton";
import ShowMoreButton from "./ShowMoreButton";
import JobCardDescription from "./JobCardDescription";
import "./JobCard.css";

type JobCardProps = {
    id: number;
    employer: string;
    logo: string;
    city: string;
    occupation: string;
    url: string;
    backupURL: string;
    headline: string;
    postedAt: string;
    description: string;
    handleOpenCard: (id: number) => void;
    isOpen: boolean;
    employmentType: string;
};

function JobCard({
    id,
    employer,
    logo,
    city,
    occupation,
    url,
    backupURL,
    headline,
    postedAt,
    description,
    handleOpenCard,
    isOpen,
    employmentType,
}: JobCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const toggleShowMore = () => {
        handleOpenCard(id);
    };

    const isHTML = (str: string) => {
        const doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(
            (node) => node.nodeType === 1
        );
    };

    // Funktion för att göra länkar klickbara
    const makeLinksClickable = (text: string) => {
        return text.replace(
            /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/g,
            ' <a class="regular-url" href="$1" target="_blank">$1</a>'
        );
    };

    return (
        <div className="card-container" id={id.toString()}>
            <div className="header-container">
                <JobCardHeader
                    headline={headline}
                    employer={employer}
                    city={city}
                    occupation={occupation}
                    postedAt={postedAt}
                    employmentType={employmentType}
                    url={url}
                    backupURL={backupURL}
                />
                <div className="button-card-container">
                    <FavoriteButton
                        isFavorite={isFavorite}
                        toggleFavorite={toggleFavorite}
                    />
                    <ShowMoreButton
                        isOpen={isOpen}
                        toggleShowMore={toggleShowMore}
                    />
                </div>
            </div>
            <JobCardDescription
                isOpen={isOpen}
                description={description}
                isHTML={isHTML}
                makeLinksClickable={makeLinksClickable}
                url={url}
                backupURL={backupURL}
                logo={logo}
            />
        </div>
    );
}

export default JobCard;
