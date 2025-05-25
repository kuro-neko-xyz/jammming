import styles from "./App.module.scss";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className={styles.app}>
      <SearchBar />
      <Playlist />
    </div>
  );
}

export default App;
