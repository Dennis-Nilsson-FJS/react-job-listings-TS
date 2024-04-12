import "./Suggestions.css";

type SuggestionProps = {
    suggestions: string[];
    onSuggestionClick: (suggestion: string) => void;
};

function Suggestions({ suggestions, onSuggestionClick }: SuggestionProps) {
    return (
        <ul id="suggestion-list">
            {suggestions.map((suggestion, index) => (
                <li
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="suggestion"
                >
                    {suggestion}
                </li>
            ))}
        </ul>
    );
}

export default Suggestions;
