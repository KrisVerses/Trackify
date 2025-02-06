import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlist, onRemoveTrack, updatePlaylistName }) {
  return (
    <div>
      <label htmlFor="playlist-name">Playlist: </label>
      <input
        id="playlist-name"
        type="text"
        value={playlist.name}
        onChange={(e) => updatePlaylistName(e.target.value)}
      />
      <Tracklist
        tracks={playlist.tracks}
        isInPlaylist={true}
        onTrackAction={onRemoveTrack}
      />
    </div>
  );
}

export default Playlist;
