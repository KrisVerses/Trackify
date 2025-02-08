import axios from "axios";
import { makeRequest } from "../utils/helpers";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:5173/callback";
const base_url = "https://api.spotify.com/v1/";
let accessToken = null;
let expiresIn = null;

const SpotifyAPI = {
  getAccessToken() {
    if (accessToken && Date.now() < expiresIn) return accessToken;

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    expiresIn = params.get("expires_in");

    if (token) {
      accessToken = token;
      expiresIn = Date.now() + Number(expiresIn) * 1000; // Convert to future timestamp
      window.history.pushState({}, null, "/");

      setTimeout(() => (accessToken = ""), Number(expiresIn) * 1000); // Reset after expiry
      return accessToken;
    }

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=playlist-modify-public`;

    window.location.href = authUrl;
  },
  async searchTrack(searchTerm) {
    if (!searchTerm?.trim()) {
      console.warn("Search query is empty. Aborting request.");
      return [];
    }

    const token = this.getAccessToken();
    if (!token) {
      console.error("No access token found! User may need to log in.");
      return;
    }

    const searchEndpoint = `${base_url}search?type=track&q=${encodeURIComponent(
      searchTerm
    )}`;

    try {
      const response = await makeRequest("get", searchEndpoint);
      if (!response?.tracks?.items) {
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
      console.error(
        "Error fetching track:",
        e.response?.data?.error?.message || e.message
      );
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
    const token = this.getAccessToken(); // Fetch and set the token if needed
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
