import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracks, onTrackAction }) {
  return (
    <div className="search-results-container p-4">
      <h2 className="text-white text-lg font-semibold">Search Results</h2>
      {tracks.length === 0 ? (
        <p className="text-gray-400">No results found. Try another search.</p>
      ) : (
        <Tracklist tracks={tracks} onTrackAction={onTrackAction} />
      )}
    </div>
  );
}

export default SearchResults;
