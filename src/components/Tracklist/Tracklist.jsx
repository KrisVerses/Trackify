import React from "react";
import Track from "./Track";

function Tracklist({ tracks, onTrackAction, isInPlaylist }) {
  return (
    <div>
      {tracks.map((track, i) => (
        <Track
          key={track.id}
          track={track}
          isInPlaylist={isInPlaylist}
          onTrackAction={onTrackAction}
        />
      ))}
    </div>
  );
}

export default Tracklist;
