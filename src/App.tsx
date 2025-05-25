import { useState } from "react";
import styles from "./App.module.scss";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import type { Track, Tracks } from "./models/Track";

function App() {
  const [playlist, setPlaylist] = useState<Tracks>([]);

  const handleAddTrack = (track: Track) => {
    const isTrackInPlaylist = playlist.some(
      (t) =>
        t.artist === track.artist &&
        t.name === track.name &&
        t.album === track.album
    );
    if (!isTrackInPlaylist) {
      setPlaylist((prev) => [...prev, track]);
    }
  };

  const handleRemoveTrack = (track: Track) => {
    setPlaylist((prev) =>
      prev.filter(
        (t) =>
          t.artist !== track.artist ||
          t.name !== track.name ||
          t.album !== track.album
      )
    );
  };

  return (
    <div className={styles.app}>
      <SearchBar onTrackClick={handleAddTrack} />
      <Playlist onTrackClick={handleRemoveTrack} playlist={playlist} />
    </div>
  );
}

export default App;
