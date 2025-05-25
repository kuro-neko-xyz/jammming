import styles from "./App.module.scss";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className={styles.app}>
      <SearchBar />
    </div>
  );
}

export default App;
