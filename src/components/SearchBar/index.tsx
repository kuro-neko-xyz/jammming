import { useEffect, useState, type FC } from "react";
import searchBarTransform from "../../transforms/SearchBar";
import Option from "../Option";
import { type Track, type Tracks } from "../../models/Track";
import styles from "./styles.module.scss";

interface SearchBarProps {
  onTrackClick: (track: Track) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onTrackClick }) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Tracks>([]);

  useEffect(() => {
    try {
      const response = searchBarTransform(input);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [input]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className={styles.input}
        id="search"
        name="search"
        onChange={handleInputChange}
        type="text"
        value={input}
      />
      {data.map((track) => (
        <Option
          key={`${track.name}-${track.artist}`}
          onClick={onTrackClick}
          track={track}
        />
      ))}
    </form>
  );
};

export default SearchBar;
