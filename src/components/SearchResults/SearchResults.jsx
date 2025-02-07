import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({
  tracks,
  onTrackAction,
  activePreview,
  setActivePreview,
}) {
  return (
    <div className="bg-softGreen p-6 rounded-lg w-full max-w-2xl">
      <h2 className="text-2xl font-bold font-roboto text-veryDarkGreen text-center tracking-wide uppercase mt-4 mb-2">
        Search Results
      </h2>

      {tracks.length === 0 ? (
        <p className="text-gray-500 text-2xl text-center my-8">
          No results found. Try another search.
        </p>
      ) : (
        <Tracklist
          tracks={tracks}
          onTrackAction={onTrackAction}
          activePreview={activePreview}
          setActivePreview={setActivePreview}
        />
      )}
    </div>
  );
}

export default SearchResults;
