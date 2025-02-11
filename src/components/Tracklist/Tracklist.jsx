import React from "react";
import Track from "./Track";
import SpotifyAPI from "../../api/spotify";

function Tracklist({
  tracks,
  onTrackAction,
  isInPlaylist,
  activePreview,
  setActivePreview,
  searchResultsRef,
  isPlaylistView,
}) {
  return (
    <div className="flex flex-col">
      {tracks ? (
        tracks?.map((track, i) => (
          <Track
            key={track.id}
            track={track}
            isInPlaylist={isInPlaylist}
            onTrackAction={onTrackAction}
            activePreview={activePreview}
            setActivePreview={setActivePreview}
            searchResultsRef={searchResultsRef}
            isPlaylistView={isPlaylistView}
          />
        ))
      ) : (
        <>
          <p className="text-gray-500 text-md text-center my-8">
            Please Login to see search results 🔒
          </p>
          <button
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-white mt-4"
            onClick={SpotifyAPI.getAccessToken}
          >
            Login with Spotify
          </button>
        </>
      )}
    </div>
  );
}

export default Tracklist;
