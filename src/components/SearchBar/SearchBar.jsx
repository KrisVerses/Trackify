import React from "react";
import SearchButton from "./SearchButton";

function SearchBar({
  handleSearchInputChange,
  handleSearch,
  searchTerm,
  isLoggedIn,
}) {
  return (
    <div className="bg-darkGreen bg-opacity-90 p-8 rounded-xl shadow-lg max-w-lg w-full">
      <label htmlFor="search-track">
        <p className="text-white text-2xl text-center mb-4">
          {isLoggedIn
            ? "Search Spotify to create a custom playlist"
            : "Please log in to Spotify to start searching"}
        </p>
      </label>
      <div className="flex items-center bg-gray-50 rounded-full shadow-md px-4 py-2 transition-all hover:shadow-lg">
        <input
          className="flex-1 text-gray-800 bg-white outline-none text-xl px-5 py-2 w-full max-w-sm border rounded-l-full border-gray-300 focus:ring-2 focus:ring-green-500 transition-all"
          id="search-track"
          value={searchTerm}
          placeholder="Enter song, album, or artist..."
          onChange={handleSearchInputChange}
          autoComplete="off"
        />
        <SearchButton handleSearch={handleSearch} searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default SearchBar;
