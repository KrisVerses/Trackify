import React from "react";

const SpotifyEmbed = ({ trackId, setIframeLoaded }) => {
  return (
    <div className="rounded-lg overflow-hidden transform-none scale-100">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        className="transform-none preview-fade scale-100"
        onLoad={() => setIframeLoaded(true)}
      ></iframe>
    </div>
  );
};

export default SpotifyEmbed;
