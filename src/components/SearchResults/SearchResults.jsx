import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({
  tracks,
  onTrackAction,
  activePreview,
  setActivePreview,
  loading,
  searchResultsRef,
  isPlaylistView,
}) {
  console.log("Searching for tracks...");
  console.log(tracks);
  return (
    <div
      className="bg-softGreen lg:p-6 md:p-2 sm:p-0 rounded-lg w-full scroll-smooth"
      ref={searchResultsRef}
    >
      <h2 className="text-2xl font-semibold font-roboto text-veryDarkGreen text-center tracking-wide uppercase mt-4 mb-2">
        Search Results
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        </div>
      ) : tracks?.length === 0 ? (
        <p className="text-gray-500 text-md text-center my-8">
          No results found. Try another search.
        </p>
      ) : (
        <Tracklist
          tracks={tracks}
          onTrackAction={onTrackAction}
          activePreview={activePreview}
          setActivePreview={setActivePreview}
          searchResultsRef={searchResultsRef}
          isPlaylistView={isPlaylistView}
        />
      )}
    </div>
  );
}

export default SearchResults;
