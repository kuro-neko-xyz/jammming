import type { Tracks } from "../../models/Track";

interface playlistTransformFields {
  name: string;
  tracks: Tracks;
  token: string;
}

const playlistTransform = async (props: playlistTransformFields) => {
  const userResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error("Failed to fetch user information");
  }

  const userData = await userResponse.json();
  const userId = userData.id;

  const playlistResponse = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        name: props.name,
        description: "Created with Jamming",
      }),
    }
  );

  if (!playlistResponse.ok) {
    throw new Error("Failed to create playlist");
  }

  const playlistData = await playlistResponse.json();
  const playlistId = playlistData.id;
  const tracksUris = props.tracks.map((track) => track.uri);

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        uris: tracksUris,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add tracks to playlist");
  }

  const data = await response.json();

  return data;
};

export default playlistTransform;
