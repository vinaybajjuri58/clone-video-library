export const YoutubeVideoDisplay = ({ youtubeId }) => {
  return (
    <div className="iframe-div">
      <iframe
        title="youtube"
        className="video-iframe"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  );
};
