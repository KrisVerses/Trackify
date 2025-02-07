// import SpotifyEmbed from "../SpotifyEmbed/SpotifyEmbed";

// const Track = ({
//   track,
//   isInPlaylist,
//   onTrackAction,
//   activePreview,
//   setActivePreview,
// }) => {
//   const isPreviewing = activePreview === track.id;

//   return (
//     <div
//       className={`flex flex-col p-4 rounded-xl border border-mediumGreen hover:shadow-lg hover:bg-opacity-90 hover:border-green-400
//  mb-2 transition shadow-[0_4px_10px_rgba(0,0,0,0.3)]
//     ${
//       isPreviewing && !isInPlaylist
//         ? "bg-red-700 active-preview"
//         : "bg-gradient-to-r from-darkGreen to-darkerGreen"
//     }
//     ${!isPreviewing ? "hover:scale-[1.02]" : ""}`}
//     >
//       {/* Track Info */}
//       <div className="flex items-center">
//         <img src={track.image} className="w-28 h-28 rounded-lg mr-4" />
//         <div className="flex-1">
//           <h3
//             className={`font-bold text-xl ${
//               isPreviewing ? "text-white font-bold" : "text-softGreen"
//             }`}
//           >
//             {track.name}
//           </h3>
//           <p
//             className={`text-lg ${
//               isPreviewing
//                 ? "text-white font-semibold"
//                 : "text-mediumGreen text-md"
//             }`}
//           >
//             {track.artist}
//           </p>
//         </div>

//         {/* Preview Button */}
//         <button
//           onClick={() => setActivePreview(isPreviewing ? null : track.id)}
//           className={`relative group w-12 h-12 flex text-white bg-opacity-90 hover:bg-opacity-100 items-center justify-center rounded-full text-lg transition-transform hover:scale-110
//     ${
//       isPreviewing
//         ? "bg-red-500 scale-110 shadow-[0_0_8px_rgba(255,0,0,0.7)]"
//         : "bg-green-600 hover:bg-green-500"
//     }`}
//         >
//           ▶
//           <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 shadow-lg transition-opacity duration-200 ease-in-out">
//             {isPreviewing ? "Stop Preview" : "Play Preview"}
//           </span>
//         </button>

//         {/* Add/Remove Button */}
//         <button
//           onClick={() => onTrackAction(track)}
//           className="ml-2 bg-green-600 hover:bg-green-500 w-12 h-12 flex text-white text-2xl items-center justify-center rounded-full transition"
//         >
//           {isInPlaylist ? "-" : "+"}
//         </button>
//       </div>

//       <div
//         className={`transition-all duration-300 overflow-hidden ${
//           isPreviewing ? "opacity-100 h-auto mt-2" : "opacity-0 h-0"
//         }`}
//       >
//         <SpotifyEmbed trackId={track.id} />
//       </div>
//     </div>
//   );
// };

// export default Track;

const Track = ({
  track,
  isInPlaylist,
  onTrackAction,
  isPlaylistView,
  activePreview,
  setActivePreview,
}) => {
  const isPreviewing = activePreview === track.id;

  return (
    <div
      className={`flex mt-2 transition duration-200 ${
        !isPlaylistView && isPreviewing
          ? "p-3 flex-col rounded-lg shadow-md bg-red-700 border border-darkGreen"
          : !isPlaylistView && !isPreviewing
          ? "p-3 flex-col rounded-lg shadow-md bg-gradient-to-r from-darkGreen to-darkerGreen hover:brightness-110"
          : "border-b border-softGreen py-[2px] px-2 flex justify-between text-sm"
      }`}
    >
      {/* Track Row */}
      <div className="flex items-center justify-between">
        {/* Track Image (Only in Search Results) */}
        {!isPlaylistView && (
          <img src={track.image} className="w-24 h-24 rounded-lg mr-4" />
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

        {/* Buttons Container - Ensures Centering */}
        <div
          className={`flex items-center ${
            isPlaylistView ? "space-x-2" : "space-x-4"
          }`}
        >
          {/* Preview Button with Tooltip (Only in Search Results) */}
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
                ▶
              </button>

              {/* Tooltip - Appears on Hover */}
              <span className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {isPreviewing ? "Stop Preview" : "Play Preview"}
              </span>
            </div>
          )}

          {/* Add/Remove Button */}
          <button
            onClick={() => onTrackAction(track)}
            className={`flex items-center text-white justify-center font-bold rounded-full transition
    ${
      isPlaylistView
        ? "w-6 h-6 text-xs bg-red-500 hover:bg-red-400 ml-auto" // Smaller buttons in playlist, right-aligned
        : "w-8 h-8 bg-green-600 hover:bg-green-500" // Normal buttons in search results
    }`}
          >
            {isInPlaylist ? "✖" : "+"}
          </button>
        </div>
      </div>

      {!isPlaylistView && isPreviewing && (
        <div className="mt-2 rounded-lg overflow-hidden w-full">
          <iframe
            src={`https://open.spotify.com/embed/track/${track.id}`}
            width="100%"
            height="80"
            allow="encrypted-media"
            className="rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Track;
