
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./ShowMoreButton.css"

type ShowMoreButtonProps = {
    isOpen: boolean;
    toggleShowMore: () => void;
};

function ShowMoreButton({ isOpen, toggleShowMore }: ShowMoreButtonProps) {
    return (
        <button className="show-more-button" onClick={toggleShowMore}>
            {isOpen ? "Visa mindre" : "Visa mer"}
            {isOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </button>
    );
}

export default ShowMoreButton;
