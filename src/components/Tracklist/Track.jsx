import React from "react";

function Track({ track, isInPlaylist = false, onTrackAction }) {
  return (
    <div>
      <p>Track Name: {track.name}</p>
      <p>Artist: {track.artist}</p>
      <p>Album: {track.album}</p>
      <button onClick={() => onTrackAction(track)}>
        {isInPlaylist ? "-" : "+"}
      </button>
    </div>
  );
}

export default Track;
