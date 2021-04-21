import { useParams } from "react-router-dom";
import { useData } from "../Context";
import { Video } from "../Components";
export const PlayListVideos = () => {
  const { playlistId } = useParams();
  const {
    state: { playlists, videos },
  } = useData();
  const playlist = playlists.find((item) => item.id === parseInt(playlistId));
  const getVideoObject = (videoId) => {
    return videos.find((item) => item.id === videoId);
  };
  return (
    <div>
      <h2>{playlist.name}</h2>
      {playlist.videos.length > 0 ? (
        <ul className="video-list">
          {playlist.videos.map((item) => (
            <Video key={item.id} video={getVideoObject(item)} />
          ))}
        </ul>
      ) : (
        <p>No Videos present in playlist</p>
      )}
    </div>
  );
};
