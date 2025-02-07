import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({
  playlist,
  onRemoveTrack,
  updatePlaylistName,
  activePreview,
  setActivePreview,
}) {
  return (
    <div className="p-6 rounded-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold font-roboto text-softGreen text-center tracking-wide uppercase mt-4 mb-2">
        Playlists
      </h1>
      <div className="flex items-center mb-4">
        <label
          htmlFor="playlist-name"
          className="text-softGreen text-lg font-semibold mr-2"
        >
          Name:
        </label>
        <input
          id="playlist-name"
          type="text"
          placeholder="Enter Playlist Name"
          value={playlist.name}
          onChange={(e) => updatePlaylistName(e.target.value)}
          autoComplete="off"
          className="w-4/5 bg-white text-darkerGreen text-lg px-4 py-2 rounded-lg shadow-inner focus:outline-double focus:ring-2 focus:ring-accentGreen"
        />
      </div>
      <Tracklist
        tracks={playlist.tracks}
        isInPlaylist={true}
        onTrackAction={onRemoveTrack}
        activePreview={activePreview}
        setActivePreview={setActivePreview}
      />
    </div>
  );
}

export default Playlist;
