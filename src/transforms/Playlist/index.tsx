import type { Tracks } from "../../models/Track";

interface playlistTransformFields {
  name: string;
  tracks: Tracks;
}

const playlistTransform = (props: playlistTransformFields) => {
  console.log(props);
};

export default playlistTransform;
