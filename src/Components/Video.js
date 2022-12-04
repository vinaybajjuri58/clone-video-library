import { ActionTypes, useData, useAuth } from "../Context";
import { Link } from "react-router-dom";
import { removeFromLiked } from "./serverCalls";

export const Video = ({ video, removeFromHistory }) => {
  const { dispatch, showSnackBar, setSnackBarContent } = useData();
  const {
    authState: { isLoggedIn, userToken },
  } = useAuth();
  const removeFromHistoryHandler = async (video) => {
    if (isLoggedIn) {
      const data = await removeFromLiked({
        videoId: video.id,
        token: userToken,
      });
      if (data.success === true) {
        setSnackBarContent(`Video Removed from History`);
        showSnackBar();
        dispatch({
          type: ActionTypes.REMOVE_FROM_HISTORY,
          payload: video.videoId,
        });
      } else {
        setSnackBarContent(`Error in removing video from history`);
        showSnackBar();
      }
    }
  };
  return (
    <div id={video.videoId} className="card card-style">
      <Link to={`/video/${video.id}`}>
        <div className="card-image-container">
          <img
            className="card-img card-img-style"
            src={video.imageUrl}
            alt={video.name}
          />
        </div>
      </Link>
      <div style={{ display: "flex" }}>
        <div className="avatar-container-sm  avatar-padding">
          <img
            className="avatar"
            src={video.avatarSrc}
            alt={video.uploadedBy}
          />
        </div>
        <p>{video.description}</p>
        {removeFromHistory && (
          <button
            className="icon-button card-remove button-style"
            onClick={() => {
              removeFromHistoryHandler(video);
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};
