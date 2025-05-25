import type { FC } from "react";
import styles from "./styles.module.scss";
import type { Track, Tracks } from "../../models/Track";
import TrackInPlaylist from "../TrackInPlaylist";

interface PlaylistProps {
  onTrackClick: (track: Track) => void;
  playlist: Tracks;
}

const Playlist: FC<PlaylistProps> = ({ onTrackClick, playlist }) => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={playlist.length ? styles.playlist : styles.emptyPlaylist}>
        <div className={styles.songsContainer}>
          {playlist.map((track) => (
            <TrackInPlaylist
              key={`${track.name}-${track.artist}`}
              onTrackClick={onTrackClick}
              track={track}
            />
          ))}
        </div>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <input type="submit" value="Save playlist" />
        </form>
      </div>
    </div>
  );
};

export default Playlist;
