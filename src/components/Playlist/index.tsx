import type { FC } from "react";
import styles from "./styles.module.scss";
import type { Tracks } from "../../models/Track";

interface PlaylistProps {
  playlist: Tracks;
}

const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {playlist.map((track) => (
          <img
            alt={`${track.album} album cover`}
            className={styles.cover}
            key={`${track.name}-${track.artist}`}
            src={track.cover}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
