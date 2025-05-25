import type { FC } from "react";
import type { Track } from "../../models/Track";
import styles from "./styles.module.scss";

interface TrackInPlaylistProps {
  onTrackClick: (track: Track) => void;
  track: Track;
}

const TrackInPlaylist: FC<TrackInPlaylistProps> = ({ onTrackClick, track }) => {
  return (
    <button
      aria-label={`Remove ${track.name} from playlist`}
      className={styles.cover}
      onClick={() => onTrackClick(track)}
      title={`${track.artist} - ${track.name}`}
    >
      <img
        alt={`${track.album} album cover`}
        aria-hidden="true"
        src={track.cover}
      />
      <span>-</span>
    </button>
  );
};

export default TrackInPlaylist;
