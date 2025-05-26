import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import type { Track, Tracks } from "./models/Track";
import logo from "./assets/logo.jpg";
import generateRandomString from "./utils/generateRandomString";
import sha256 from "./utils/sha256";
import base64encode from "./utils/base64encode";

function App() {
  const [code, setCode] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Tracks>([]);
  const [codeChallenge, setCodeChallenge] = useState<string | null>(null);

  useEffect(() => {
    let codeVerifier = sessionStorage.getItem("code_verifier");
    if (!codeVerifier) {
      codeVerifier = generateRandomString(128);
      sessionStorage.setItem("code_verifier", codeVerifier);
    }
    sha256(codeVerifier).then((hashed) => {
      setCodeChallenge(base64encode(hashed));
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setCode(code);
    }
  }, []);

  useEffect(() => {
    const codeVerifier = sessionStorage.getItem("code_verifier");
    if (code && codeVerifier) {
      const url = "https://accounts.spotify.com/api/token";
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_CLIENT_ID,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      };

      fetch(url, payload)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAccessToken(data.access_token);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [code]);

  const handleLogin = () => {
    const scope = "playlist-modify-public";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    if (codeChallenge) {
      const params = {
        response_type: "code",
        client_id: import.meta.env.VITE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        scope,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    }
  };

  const handleAddTrack = (track: Track) => {
    const isTrackInPlaylist = playlist.some(
      (t) =>
        t.artist === track.artist &&
        t.name === track.name &&
        t.album === track.album
    );
    if (!isTrackInPlaylist) {
      setPlaylist((prev) => [...prev, track]);
    }
  };

  const handleRemoveTrack = (track: Track) => {
    setPlaylist((prev) =>
      prev.filter(
        (t) =>
          t.artist !== track.artist ||
          t.name !== track.name ||
          t.album !== track.album
      )
    );
  };

  return (
    <div className={styles.app}>
      {!accessToken && codeChallenge && (
        <div className={styles.login}>
          <button className={styles.loginButton} onClick={handleLogin}>
            Login with Spotify
          </button>
        </div>
      )}
      {accessToken && (
        <div className={styles.appContent}>
          <img className={styles.logo} src={logo} alt="Jamming logo" />
          <SearchBar onTrackClick={handleAddTrack} token={accessToken} />
          <Playlist onTrackClick={handleRemoveTrack} playlist={playlist} />
        </div>
      )}
    </div>
  );
}

export default App;
