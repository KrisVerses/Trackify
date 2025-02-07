import { useState } from "react";

import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";

import SpotifyAPI from "./api/spotify";

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
    await SpotifyAPI.saveUserPlaylist(playlist.name, exportPlaylist());
  }

  //Search Handlers
  const handleSearchInputChange = ({ target }) => {
    const query = target.value;
    setSearchTerm(query);
  };

  async function handleSearch(e) {
    const results = await SpotifyAPI.searchTrack(searchTerm);
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
    <div className="font-roboto">
      {/* Header */}
      <header className="bg-darkGreen/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="w-1/3"></div>
          <h1 className="text-white text-4xl font-bold tracking-wider absolute left-1/2 transform -translate-x-1/2 antialiased ">
            Trackify
          </h1>

          {/* Login Button on the Right */}
          <nav className="mr-4">
            <button
              className="text-white bg-green-600 hover:bg-green-500 px-6 py-2 rounded-full transition-all duration-300 shadow-md"
              onClick={SpotifyAPI.getAccessToken}
            >
              Login with Spotify
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main>
        {/* Search */}
        <section
          id="search"
          className="relative bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat w-full h-[80vh] flex justify-center items-center"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>

          {/* Search Bar */}
          <div className="relative z-10">
            <SearchBar
              handleSearchInputChange={handleSearchInputChange}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
            />
          </div>
        </section>

        <SearchResults tracks={tracks} onTrackAction={addSong} />
        {/* Playlist */}
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
