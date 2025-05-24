const SearchBar = () => {
  return (
    <form>
      <input id="search" list="suggestions" name="search" type="text" />
      <datalist id="suggestions">
        <option value="Suggestion 1" />
      </datalist>
    </form>
  );
};

export default SearchBar;
