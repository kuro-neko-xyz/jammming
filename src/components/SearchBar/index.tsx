import { useEffect, useState } from "react";
import searchBarTransform from "../../transforms/SearchBar";
import Option from "../Option";
import { type Tracks } from "../../models/Track";
import styles from "./styles.module.scss";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([] as Tracks);

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
      {data.map((item) => (
        <Option
          key={`${item.name}-${item.artist}`}
          name={item.name}
          artist={item.artist}
          album={item.album}
          cover={item.cover}
        />
      ))}
    </form>
  );
};

export default SearchBar;
