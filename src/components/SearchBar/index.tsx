import searchBarTransform from "../../transforms/SearchBar";
import Option from "../Option";

const SearchBar = () => {
  const data = searchBarTransform();

  return (
    <form>
      <input id="search" name="search" type="text" />
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
