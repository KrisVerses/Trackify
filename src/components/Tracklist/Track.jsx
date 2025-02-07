import SpotifyEmbed from "../SpotifyEmbed/SpotifyEmbed";

const Track = ({
  track,
  isInPlaylist,
  onTrackAction,
  activePreview,
  setActivePreview,
}) => {
  const isPreviewing = activePreview === track.id;

  return (
    <div
      className={`flex flex-col p-4 rounded-xl shadow-md border border-mediumGreen hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 mb-2 ${
        isPreviewing && !isInPlaylist
          ? "bg-red-700 active-preview"
          : "bg-gradient-to-r from-darkGreen to-darkerGreen"
      }`}
    >
      {/* Track Info */}
      <div className="flex items-center">
        <img src={track.image} className="w-20 h-20 rounded-lg mr-4" />
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              isPreviewing ? "text-white font-bold" : "text-softGreen"
            }`}
          >
            {track.name}
          </h3>
          <p className="text-mediumGreen text-sm">{track.artist}</p>
        </div>

        {/* Preview Button */}
        <button
          onClick={() => setActivePreview(isPreviewing ? null : track.id)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-200 ${
            isPreviewing
              ? "bg-red-500 scale-110"
              : "bg-green-600 hover:bg-green-500 hover:scale-105"
          }`}
        >
          🎵
        </button>

        {/* Add/Remove Button */}
        <button
          onClick={() => onTrackAction(track)}
          className="ml-2 bg-green-600 hover:bg-green-500 w-10 h-10 flex items-center justify-center rounded-full transition"
        >
          {isInPlaylist ? "-" : "+"}
        </button>
      </div>

      {/* Spotify Embed Preview (Toggles on Click) */}
      {isPreviewing && <SpotifyEmbed trackId={track.id} />}
    </div>
  );
};

export default Track;
