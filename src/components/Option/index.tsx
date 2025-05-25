import type { FC } from "react";
import type { Track } from "../../models/Track";
import styles from "./styles.module.scss";

interface OptionProps {
  onClick: (track: Track) => void;
  track: Track;
}

const Option: FC<OptionProps> = ({ track, onClick }) => {
  return (
    <button
      aria-label={`Add ${track.name} to playlist`}
      className={styles.option}
      onClick={() => onClick(track)}
      type="button"
    >
      <img src={track.cover} alt={`${track.album} album cover`} />
      <h3>{track.name}</h3>
      <p>
        {track.artist} - {track.album}
      </p>
      <span aria-hidden="true">+</span>
    </button>
  );
};

export default Option;
