import React from "react";
import SpotifyAPI from "../../api/spotify";
function SearchButton({ handleSearch, searchTerm }) {
  return (
    <button
      className="ml-2 bg-green-600 hover:bg-green-500 font-bold text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:scale-105"
      onClick={(e) => {
        handleSearch();
      }}
      disabled={!searchTerm.trim()}
    >
      Search
    </button>
  );
}

export default SearchButton;
