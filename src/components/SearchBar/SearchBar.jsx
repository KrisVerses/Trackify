import React from "react";
import SearchButton from "./SearchButton";

function SearchBar({ handleSearchInputChange, handleSearch, searchTerm }) {
  return (
    <div className="bg-veryDarkGreen bg-opacity-80 p-8 rounded-xl shadow-lg max-w-lg w-full">
      <label htmlFor="search-track">
        <p className="text-white text-2xl text-center mb-4">
          Search Spotify to create a custom playlist
        </p>
      </label>
      <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 transition-all hover:shadow-lg">
        <input
          className="flex-1 text-gray-800 bg-transparent outline-none text-xl px-3 py-2 w-full max-w-sm border border-gray-300 focus:ring-2 focus:ring-green-500 transition-all"
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
