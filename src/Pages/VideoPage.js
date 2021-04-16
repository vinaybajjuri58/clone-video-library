import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { VideoList } from "./VideoList";
import { ActionTypes, useData } from "../Context";
export const Video = () => {
  return (
    <div style={{ display: "flex" }}>
      <VideoDisplay />
      <VideoList />
    </div>
  );
};

const VideoDisplay = () => {
  const { videoId } = useParams();
  const { state, dispatch } = useData();
  const video = state.videos.find((item) => item.id === videoId);
  return (
    <div className="video-diaplay">
      <YouTube videoId={videoId} />
      <div>
        <div style={{ display: "flex" }}>
          <img
            className="avatar-sm"
            src={video.avatarSrc}
            alt={video.uploadedBy}
          />
          <p>{video.description}</p>
        </div>
        <div>
          <button
            className="button button-unstyled"
            onClick={() => {
              dispatch({
                type: ActionTypes.ADD_TO_LIKED,
                payload: video,
              });
            }}
          >
            {inLikedVideos({ id: video.id, likedVideos: state.liked }) ? (
              <i class="fas fa-thumbs-up"></i>
            ) : (
              <i class="far fa-thumbs-up"> </i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
function inLikedVideos({ id, likedVideos }) {
  const inliked = likedVideos.find((item) => item.id === id);
  if (inliked === undefined) {
    return false;
  }
  return true;
}
