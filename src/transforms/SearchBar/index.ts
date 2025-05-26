import type { Tracks } from "../../models/Track";

const searchBarTransform = async (
  input: string,
  token: string
): Promise<Tracks> => {
  const response = await fetch(
    "https://api.spotify.com/v1/search?" +
      new URLSearchParams({
        q: input,
        type: "track,artist,album",
        limit: "3",
      }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.tracks.items.map((track: any) => ({
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri,
    cover: track.album.images[0]?.url || "",
  }));
};

export default searchBarTransform;
