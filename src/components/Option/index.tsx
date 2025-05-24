import type { FC } from "react";
import type { Track } from "../../models/Track";
import styles from "./styles.module.scss";

const Option: FC<Track> = ({ name, artist, album, cover }) => {
  return (
    <button className={styles.option} type="button">
      <img src={cover} alt={`${album} album cover`} />
      <h3>{name}</h3>
      <p>
        {artist} - {album}
      </p>
    </button>
  );
};

export default Option;
