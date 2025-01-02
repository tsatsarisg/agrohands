import { useState } from "react";
import { fetchLocationSuggestions } from "../../api/Location";

interface LocationInputProps {
  defaultValue?: string;
}

const getSuggestionValue = (suggestion: Suggestion) =>
  `${suggestion.properties.name}, ${suggestion.properties.state}, ${suggestion.properties.country}`;
type Suggestion = {
  properties: {
    name: string;
    state: string;
    country: string;
    osm_id: string;
  };
};

const LocationInput: React.FC<LocationInputProps> = ({ defaultValue }) => {
  const [query, setQuery] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (e.target.value.length > 2) {
      const suggestions = await fetchLocationSuggestions(e.target.value);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(getSuggestionValue(suggestion));
    setSuggestions([]);
  };

  return (
    <>
      <input
        type="text"
        id="location"
        name="location"
        value={query}
        onChange={handleInputChange}
        placeholder="Search location"
      />
      {suggestions.length > 0 && (
        <ul className="mt-1 max-h-60 overflow-y-auto bg-white rounded-md shadow-lg border border-gray-300">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-emerald-900 hover:text-white transition duration-200"
            >
              {getSuggestionValue(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LocationInput;
