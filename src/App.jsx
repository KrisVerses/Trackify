import { useState, useEffect, useRef } from "react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [user, setUser] = useState(null);

  const searchResultsRef = useRef(null);

  useEffect(() => {
    const preservedSearchTerm = localStorage.getItem("searchTerm");
    if (preservedSearchTerm) {
      setSearchTerm(preservedSearchTerm);
    }

    const token = SpotifyAPI.getAccessToken();
    if (token) {
      fetchUser(token).finally(() => setIsFetchingUser(false)); // Ensure loading state is cleared
    } else {
      setIsFetchingUser(false); // No token, stop loading
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);
    }
  }, [searchTerm]);

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

  const handleSearch = async (e) => {
    // if (!isLoggedIn) {
    //   alert("Please log in to search for tracks.");
    //   return;
    // }

    setLoading(true);
    try {
      const results = await SpotifyAPI.searchTrack(searchTerm);
      setTracks(results);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Utility functions
  const exportPlaylist = () => {
    if (playlist.length === 0) {
      console.warn("Cannot export an empty playlist!");
      return [];
    }

    return playlist.tracks.map((track) => track.uri);
  };

  const fetchUser = async () => {
    try {
      const { user } = await SpotifyAPI.fetchSpotifyUserData();
      console.log("Fetched user:", user);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      handleLogout(); // Clear token and reset state on failure
    }
  };

  const handleLogin = async () => {
    console.log("Logging in...");
    let token = SpotifyAPI.getAccessToken(); // Redirect to Spotify for login
    console.log("token: " + token);
    if (token) {
      await fetchUser();
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("spotifyToken");
    setIsLoggedIn(false);
    setUser(null);
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
            {isLoggedIn && user ? (
              <div className="flex items-center space-x-4">
                <p className="text-white font-semibold">Welcome, {user}!</p>
                <button
                  className="text-white font-bold bg-red-600 hover:bg-red-500 px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="text-white font-bold bg-green-600 hover:bg-green-500 px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                onClick={handleLogin}
              >
                Login with Spotify
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main>
        {/* Search */}
        <section
          id="search"
          className="relative bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat w-full h-[60vh] mt-10 flex justify-center items-center"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Search Bar */}
          <div className="relative z-10">
            <SearchBar
              handleSearchInputChange={handleSearchInputChange}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </section>

        {/* SEARCH AND PLAYLIST CONTAINER */}
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-6 gap-4 p-6 animate-fadeIn">
          {/* Search Results Section */}
          <section
            id="search-results"
            className="flex-1 bg-softGreen p-4 rounded-lg shadow-md overflow-y-auto max-h-[550px]"
          >
            <SearchResults
              tracks={tracks}
              onTrackAction={addSong}
              activePreview={activePreview}
              setActivePreview={setActivePreview}
              loading={loading}
              searchResultsRef={searchResultsRef}
              isPlaylistView={false}
            />
          </section>

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
      <footer className="flex justify-center border-t border-gray-600 text-sm bg-darkGreen p-6 text-gray-300">
        <p className="mr-3.5">Trackify 2025</p>
        <p className="ml-3.5 mr-1.5">Powered by the Spotify Web API</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#1DB954"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.648.5.5 5.648.5 12S5.648 23.5 12 23.5 23.5 18.352 23.5 12 18.352.5 12 .5zm5.338 17.693a.77.77 0 01-1.053.237c-2.884-1.773-6.523-2.171-10.793-1.181a.77.77 0 01-.36-1.502c4.598-1.099 8.617-.658 11.846 1.32.364.224.478.701.237 1.053zm1.411-3.158a.923.923 0 01-1.261.284c-3.303-2.029-8.364-2.615-12.24-1.363a.923.923 0 11-.526-1.769c4.374-1.302 9.89-.667 13.596 1.545.437.268.576.847.284 1.261zm.157-3.461C15.396 8.984 8.585 8.783 4.663 9.996a1.078 1.078 0 11-.615-2.067c4.418-1.316 11.879-1.075 16.014 1.62a1.078 1.078 0 11-1.106 1.845z" />
        </svg>
      </footer>
    </div>
  );
}

export default App;
