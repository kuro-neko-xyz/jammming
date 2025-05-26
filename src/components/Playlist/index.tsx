import { useState, type FC } from "react";
import styles from "./styles.module.scss";
import type { Track, Tracks } from "../../models/Track";
import TrackInPlaylist from "../TrackInPlaylist";
import playlistTransform from "../../transforms/Playlist";

interface PlaylistProps {
  onTrackClick: (track: Track) => void;
  playlist: Tracks;
}

const Playlist: FC<PlaylistProps> = ({ onTrackClick, playlist }) => {
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() === "") {
      alert("Playlist name cannot be empty");
      return;
    }
    if (playlist.length === 0) {
      alert("Playlist cannot be empty");
      return;
    }
    const newPlaylist = {
      name: name.trim(),
      tracks: playlist,
    };
    playlistTransform(newPlaylist);
  };

  return (
    <div className={styles.container}>
      <div className={playlist.length ? styles.playlist : styles.emptyPlaylist}>
        <form className={styles.title}>
          <input
            type="text"
            placeholder="New Playlist"
            value={name}
            onChange={handleNameChange}
          />
        </form>
        <div className={styles.songsContainer}>
          {playlist.map((track) => (
            <TrackInPlaylist
              key={track.uri}
              onTrackClick={onTrackClick}
              track={track}
            />
          ))}
        </div>
        <form className={styles.submit} onSubmit={handleFormSubmit}>
          <input type="submit" value="Save playlist" />
        </form>
      </div>
    </div>
  );
};

export default Playlist;
