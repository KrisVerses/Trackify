import React from "react";
import Track from "./Track";

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
      {tracks.map((track, i) => (
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
      ))}
    </div>
  );
}

export default Tracklist;
