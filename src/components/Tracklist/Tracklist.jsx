import React from "react";
import Track from "./Track";

function Tracklist({
  tracks,
  onTrackAction,
  isInPlaylist,
  activePreview,
  setActivePreview,
}) {
  return (
    <div>
      {tracks.map((track, i) => (
        <Track
          key={track.id}
          track={track}
          isInPlaylist={isInPlaylist}
          onTrackAction={onTrackAction}
          activePreview={activePreview}
          setActivePreview={setActivePreview}
        />
      ))}
    </div>
  );
}

export default Tracklist;
