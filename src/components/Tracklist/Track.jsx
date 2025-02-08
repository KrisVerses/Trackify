import React, { useState } from "react";
import SpotifyEmbed from "../SpotifyEmbed/SpotifyEmbed";

const Track = ({
  track,
  isInPlaylist,
  onTrackAction,
  isPlaylistView,
  activePreview,
  setActivePreview,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isPreviewing = activePreview === track.id;

  return (
    <div
      className={`mt-2 transition duration-200 md:w-full ${
        isPlaylistView
          ? "border-b border-softGreen py-2 px-2"
          : isPreviewing
          ? "p-3 flex-col rounded-lg shadow-md bg-red-700 border border-darkGreen"
          : "p-3 flex-col rounded-lg shadow-md bg-gradient-to-r from-darkGreen to-darkerGreen hover:brightness-110"
      }`}
    >
      {/* Track Row */}
      <div className="flex items-center w-full">
        {/* Track Image (Only in Search Results) */}
        {!isPlaylistView && (
          <img src={track.image} className="w-28 h-28 rounded-lg mr-4" />
        )}

        {/* Track Info */}
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              isPreviewing ? "text-white" : "text-softGreen"
            }`}
          >
            {track.name}
          </h3>
          <p className="text-mediumGreen text-sm">{track.artist}</p>
        </div>

        {/* Buttons Container */}
        <div
          className={`flex sm:flex-row flex-col sm:space-x-2 space-y-2 sm:space-y-0 items-center`}
        >
          {!isPlaylistView && (
            <div className="relative group">
              <button
                onClick={() => setActivePreview(isPreviewing ? null : track.id)}
                className={`flex items-center justify-center text-white w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                  isPreviewing
                    ? "bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.7)]"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                {!isPreviewing ? "▶" : "⏸"}
              </button>
              <span className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {isPreviewing ? "Close Preview" : "Open Preview"}
              </span>
            </div>
          )}

          {/* Add/Remove Button */}
          <div className="relative group">
            <button
              onClick={() => onTrackAction(track)}
              className={`flex items-center text-white justify-center font-bold rounded-full transition ${
                isPlaylistView
                  ? "ml-auto w-6 h-6 text-xs bg-red-500 hover:bg-red-400"
                  : "w-8 h-8 bg-green-600 hover:bg-green-500 text-2xl"
              }`}
            >
              {isInPlaylist ? "✖" : "+"}
            </button>
          </div>
        </div>
      </div>

      {/* Spotify Preview - Properly Positioned Below */}
      {!isPlaylistView && isPreviewing && (
        <div className="mt-2 w-full rounded-lg relative">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
              <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <SpotifyEmbed trackId={track.id} setIframeLoaded={setIframeLoaded} />
        </div>
      )}
    </div>
  );
};

export default Track;
