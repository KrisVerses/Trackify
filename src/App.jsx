import { useState, useRef } from "react";

import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";

import SpotifyAPI from "./api/spotify";

function App() {
  // State
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState({ name: "", tracks: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [activePreview, setActivePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchResultsRef = useRef(null);

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
    if (!searchTerm) return;
    setLoading(true);

    const results = await SpotifyAPI.searchTrack(searchTerm);
    setTracks(results);

    setLoading(false);

    searchResultsRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <header className="bg-darkGreen/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 py-4 px-8">
        <div className="flex justify-between items-center relative flex-col sm:flex-row sm:items-center">
          <h1 className="text-white text-4xl font-bold tracking-wider antialiased sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            Trackify
          </h1>

          {/* Login Button on the Right */}
          <nav className="mt-4 sm:mt-0 sm:ml-auto">
            <button
              className="text-white font-bold bg-green-600 hover:bg-green-500 px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
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
          className="relative bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat w-full h-[80vh] mt-10 flex justify-center items-center"
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

        {/* SEARCH AND PLAYLIST CONTAINER */}
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-6 p-6">
          {/* Search Results Section */}
          <div className="flex-1 bg-softGreen p-4 rounded-lg shadow-md overflow-y-auto max-h-[550px]">
            <SearchResults
              tracks={tracks}
              onTrackAction={addSong}
              activePreview={activePreview}
              setActivePreview={setActivePreview}
              loading={loading}
              searchResultsRef={searchResultsRef}
              isPlaylistView={false}
            />
          </div>

          {/* <!-- Playlist Section --> */}
          <section
            id="playlist"
            className="flex-1 bg-darkerGreen p-4 rounded-lg shadow-md space-y-3 min-h-[200px] flex flex-col"
          >
            {playlist.tracks.length === 0 ? (
              <p className="text-gray-400 my-8 text-center">
                Your playlist is empty. Add songs!
              </p>
            ) : (
              <Playlist
                playlist={playlist}
                onRemoveTrack={removeSong}
                updatePlaylistName={updatePlaylistName}
                activePreview={activePreview}
                setActivePreview={setActivePreview}
                isPlaylistView={true}
              />
            )}
            <div className="mt-4 text-center">
              <button
                className="bg-green-600 hover:bg-green-500 transform text-white mt-6 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg border border-green-500 hover:shadow-xl
"
                onClick={handleSave}
              >
                Save to Spotify
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
