import React from "react";

function SearchBar({ handleSearchInputChange, handleSearch, searchTerm }) {
  return (
    <div>
      <label htmlFor="search-track">Search Track: </label>
      <input
        id="search-track"
        value={searchTerm}
        placeholder="Enter track to search for..."
        onChange={handleSearchInputChange}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        disabled={!searchTerm.trim()}
      >
        Search Spotify
      </button>
    </div>
  );
}

export default SearchBar;
