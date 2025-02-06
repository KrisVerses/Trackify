import { useState } from "react";

import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";

import Spotify from "./api/spotify";

function App() {
  // State
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState({ name: "", tracks: [] });
  const [searchTerm, setSearchTerm] = useState("");

  // Playlist Handlers
  const updatePlaylistName = (newName) =>
    setPlaylist((prev) => ({ ...prev, name: newName }));

  const addSong = (songToAdd) => {
    setPlaylist((prev) => {
      // Prevent duplicates
      if (prev.tracks.some((track) => track.id === songToAdd.id)) return prev;
      return { ...prev, tracks: [...prev.tracks, songToAdd] };
    });
  };

  const removeSong = (songToRemove) => {
    setPlaylist((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((track) => track.id !== songToRemove.id),
    }));
  };

  async function handleSave() {
    await Spotify.saveUserPlaylist(playlist.name, exportPlaylist());
  }

  //Search Handlers
  const handleSearchInputChange = ({ target }) => {
    const query = target.value;
    setSearchTerm(query);
  };

  async function handleSearch(e) {
    console.log("handleSearch");
    const results = await Spotify.searchTrack(searchTerm);
    setTracks(results);
  }

  // Utility functions
  const exportPlaylist = () => {
    if (playlist.length === 0) {
      console.warn("Cannot export an empty playlist!");
      return [];
    }

    return playlist.tracks.map((track) => track.uri);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <h1 className="bg-customColor text-white p-4">Trackify</h1>
        <h1 className="bg-testColor text-white p-4">Test Color</h1>
        <button onClick={Spotify.getAccessToken}>Login with Spotify</button>
      </header>

      {/* Search */}
      <main>
        <section id="search">
          <SearchBar
            handleSearchInputChange={handleSearchInputChange}
            handleSearch={handleSearch}
            searchTerm={searchTerm}
          />
          <SearchResults tracks={tracks} onTrackAction={addSong} />
        </section>

        <section id="playlist">
          <Playlist
            playlist={playlist}
            onRemoveTrack={removeSong}
            updatePlaylistName={updatePlaylistName}
          />
          <div>
            <button onClick={handleSave}>Save to Spotify</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
