import { FaStar, FaRegStar } from "react-icons/fa";
import "./FavoriteButton.css"

type FavoriteButtonProps = {
    isFavorite: boolean;
    toggleFavorite: () => void;
};

function FavoriteButton({ isFavorite, toggleFavorite }: FavoriteButtonProps) {
    return (
        <>
            {isFavorite ? (
                <FaStar
                    onClick={toggleFavorite}
                    size={24}
                    color="#3282b8"
                    className="star"
                />
            ) : (
                <FaRegStar
                    onClick={toggleFavorite}
                    size={24}
                    color="#3282b8"
                    className="star"
                />
            )}
        </>
    );
}

export default FavoriteButton;
