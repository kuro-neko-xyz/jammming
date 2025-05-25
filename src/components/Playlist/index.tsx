import type { FC } from "react";
import styles from "./styles.module.scss";
import type { Track, Tracks } from "../../models/Track";
import TrackInPlaylist from "../TrackInPlaylist";

interface PlaylistProps {
  onTrackClick: (track: Track) => void;
  playlist: Tracks;
}

const Playlist: FC<PlaylistProps> = ({ onTrackClick, playlist }) => {
  return (
    <div className={styles.container}>
      <div className={playlist.length ? styles.playlist : styles.emptyPlaylist}>
        {playlist.map((track) => (
          <TrackInPlaylist
            key={`${track.name}-${track.artist}`}
            onTrackClick={onTrackClick}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
