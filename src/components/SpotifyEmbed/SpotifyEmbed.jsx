import React from "react";

const SpotifyEmbed = ({ trackId }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width="100%"
      height="80"
      allow="encrypted-media"
      className="mt-2 rounded-lg preview-fade"
    ></iframe>
  );
};

export default SpotifyEmbed;
