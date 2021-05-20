import { Link } from "react-router-dom";
import { useData } from "../Context";
const noVideosUrl =
  "https://pbs.twimg.com/profile_images/579325060831285248/Z76zBUF8_400x400.png";

export const Playlist = ({ playlist }) => {
  const {
    state: { videos },
  } = useData();
  const getVideoImage = (videoId) => {
    const video = videos.find((item) => item.videoId === videoId);
    return video.imageUrl;
  };
  const playlistImage =
    playlist.videos.length > 0
      ? getVideoImage(playlist.videos[0])
      : noVideosUrl;
  return (
    <Link className="link-unstyled" to={`/playlist/${playlist.id}`}>
      <div className="card card-style">
        <img src={playlistImage} alt={playlist.name} className="card-img" />
        {playlist.videos.length > 0 && (
          <div>
            <img
              alt={playlist.name}
              className="playlist-overlay-image"
              src="https://img.icons8.com/fluent-systems-filled/48/ffffff/video-playlist.png"
            />
          </div>
        )}
        <h4>{playlist.name}</h4>
      </div>
    </Link>
  );
};
