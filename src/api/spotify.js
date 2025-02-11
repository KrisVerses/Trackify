import axios from "axios";
import { makeRequest } from "../utils/helpers";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173/callback" // Local development
    : "https://your-netlify-site.netlify.app/callback"; // Production
const base_url = "https://api.spotify.com/v1/";
let accessToken = null;
let expiresIn = null;

const SpotifyAPI = {
  getAccessToken() {
    console.log("Getting access token...");
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    let token = params.get("access_token");
    expiresIn = params.get("expires_in");

    if (token) {
      console.log("there is a token");
      accessToken = token;
      expiresIn = Date.now() + Number(expiresIn) * 1000; // Convert to future timestamp
      localStorage.setItem("spotifyToken", token);
      window.history.pushState({}, null, "/");
      setTimeout(() => (accessToken = ""), Number(expiresIn) * 1000); // Reset after expiry
      return accessToken;
    }

    const storedToken = localStorage.getItem("spotifyToken");
    if (storedToken) {
      console.log("Using token from localStorage:", storedToken);
      return storedToken;
    }

    if (storedToken && Date.now() < expiresIn) {
      console.log("Token found in localStorage");
      accessToken = storedToken; // Ensure global variable is synced
      return accessToken;
    }

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=playlist-modify-public`;

    window.location.href = authUrl;
  },
  async searchTrack(searchTerm) {
    console.log("searching track...");
    if (!searchTerm?.trim()) {
      console.warn("Search query is empty. Aborting request.");
      return [];
    }

    const token = localStorage.getItem("spotifyToken");
    if (!token) {
      console.error("No access token found! User may need to log in.");
      return;
    }

    const searchEndpoint = `${base_url}search?type=track&q=${encodeURIComponent(
      searchTerm
    )}`;

    try {
      const response = await makeRequest("get", searchEndpoint);
      if (!response || !response.tracks || !response.tracks.items) {
        console.warn("No tracks found for this search query.");
        return [];
      }

      return response.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists?.[0]?.name || "Unknown Artist",
        album: track.album?.name || "Unknown Album",
        image: track.album?.images?.[0]?.url || null,
        uri: track.uri,
      }));
    } catch (e) {
      console.error("Error fetching track:", e.response || e);
      return [];
    }
  },
  async saveUserPlaylist(playlistName, trackUris) {
    if (!playlistName || trackUris.length === 0) {
      console.error("Playlist must have a name and tracks");
      return;
    }

    const token = this.getAccessToken();
    if (!token) {
      console.error("No token found! User may need to log in");
    }

    try {
      //get user's ID
      const user_id_url = `${base_url}me`;
      const userResponse = await axios.get(user_id_url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = userResponse.data.id;
      if (!userId) return null;

      //post a new playlist
      const new_playlist_url = `${base_url}users/${userId}/playlists`;
      let data = { name: playlistName };
      const playlistResponse = await makeRequest(
        "post",
        new_playlist_url,
        data
      );
      const playlistId = playlistResponse.id;
      if (!playlistResponse) return null;

      //add tracks to new playlist
      const add_tracks_to_playlist_url = `${base_url}playlists/${playlistId}/tracks`;
      data = { uris: trackUris };
      const addTracksResponse = await makeRequest(
        "post",
        add_tracks_to_playlist_url,
        data
      );
      if (!addTracksResponse) {
        console.error("Failed to add tracks to playlist");
        return null;
      }

      return playlistId;
    } catch (e) {
      console.error(
        "Error in saveUserPlaylist:",
        e.response?.data?.error?.message || e.message
      );
    }
  },
  async fetchSpotifyUserData() {
    console.log("fetching user data....");
    const token = localStorage.getItem("spotifyToken"); // Fetch and set the token if needed
    if (!token) {
      console.error("No access token found! User may need to log in.");
      return { token: null, user: null };
    }
    localStorage.setItem("spotifyToken", token);
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return { token, user: data.display_name };
  },
};

export default SpotifyAPI;
