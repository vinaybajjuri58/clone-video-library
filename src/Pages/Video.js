import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { VideoList } from "./VideoList";
import { ActionTypes, useData } from "../Context";
export const Video = () => {
  const { videoId } = useParams();
  const { state, dispatch } = useData();
  const video = state.videos.find((item) => item.id === videoId);
  return (
    <div>
      <h2>Video</h2>
      <div>
        <div className="video-display">
          <YouTube videoId={videoId} />
          <div>
            <div>
              <img
                className="avatar-sm"
                src={video.avatarSrc}
                alt={video.uploadedBy}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch({
                    type: ActionTypes.ADD_TO_LIKED,
                    payload: video,
                  });
                }}
              >
                Like
              </button>
            </div>
          </div>
        </div>
        <VideoList />
      </div>
    </div>
  );
};
