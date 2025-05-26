import { useEffect, useState, type FC } from "react";
import searchBarTransform from "../../transforms/SearchBar";
import Option from "../Option";
import { type Track, type Tracks } from "../../models/Track";
import styles from "./styles.module.scss";

interface SearchBarProps {
  onTrackClick: (track: Track) => void;
  token: string;
}

const SearchBar: FC<SearchBarProps> = ({ onTrackClick, token }) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Tracks>([]);

  const fetchData = () => {
    searchBarTransform(input, token)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setData([]);
      });
  };

  useEffect(() => {
    if (input) {
      const delay = setTimeout(() => {
        fetchData();
      }, 300);

      return () => clearTimeout(delay);
    } else {
      setData([]);
    }
  }, [input, token]);

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
        <Option key={track.uri} onClick={onTrackClick} track={track} />
      ))}
    </form>
  );
};

export default SearchBar;
