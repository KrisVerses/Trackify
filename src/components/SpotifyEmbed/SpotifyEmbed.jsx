import React from "react";

const SpotifyEmbed = ({ trackId }) => {
  return (
    <div className="rounded-lg overflow-hidden transform-none scale-100">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        className="transform-none scale-100"
      ></iframe>
    </div>
  );
};

export default SpotifyEmbed;
