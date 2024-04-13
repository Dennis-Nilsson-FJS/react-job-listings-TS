import "./BackToTopButton.css";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function BackToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {backToTopButton && (
                <button className="back-to-top-button" onClick={scrollUp}>
                    <FaArrowUp className="arrow-up-icon" />
                </button>
            )}
        </>
    );
}
