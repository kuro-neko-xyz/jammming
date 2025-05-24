import type { Tracks } from "../../models/Track";

const MOCKUP_DATA: Tracks = [
  {
    name: "Sicko Mode",
    artist: "Travis Scott",
    album: "Astroworld",
    cover:
      "https://lh3.googleusercontent.com/PSIZ9cf9hpESZwcSz2ylS5I-zIREqCSagxV-X4CJqefrE0sRCktRtFw-a7PlkLygmg7k1nZREKCaSzY=w544-h544-l90-rj",
  },
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    cover:
      "https://lh3.googleusercontent.com/JDKz3Anlyo49xBhFcFx13QD_Tk4-kqdiYTo15gtkL93nE8biWyZ7o0BPyW6RnXVxcXaJ5DgU5nJ_0NjJ=w544-h544-l90-rj",
  },
  {
    name: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    cover:
      "https://lh3.googleusercontent.com/xpDEOr2TeqEn1QpXosXhqtj149FzNnTgAG3oqPnpTxTbQk-oceO90Sz4Axq0s4Jp_QLGQha_um6_EG3WGQ=w544-h544-l90-rj",
  },
];

const searchBarTransform = (input: string) => {
  return MOCKUP_DATA.filter((track) => {
    if (!input) return false;
    const searchTerm = input.toLowerCase();

    const doesNameMatch = track.name.toLowerCase().includes(searchTerm);
    const doesArtistMatch = track.artist.toLowerCase().includes(searchTerm);
    const doesAlbumMatch = track.album.toLowerCase().includes(searchTerm);

    return doesNameMatch || doesArtistMatch || doesAlbumMatch;
  });
};

export default searchBarTransform;
