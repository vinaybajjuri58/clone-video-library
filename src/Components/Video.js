import { ActionTypes, useData } from "../Context";
import { Link } from "react-router-dom";
export const Video = ({ video, removeFromHistory }) => {
  const { dispatch, showSnackBar, setSnackBarContent } = useData();
  const removeFromHistoryHandler = (id) => {
    setSnackBarContent(`Video Removed from History`);
    showSnackBar();
    dispatch({
      type: ActionTypes.REMOVE_FROM_HISTORY,
      payload: id,
    });
  };
  return (
    <div id={video.id} className="card card-style">
      <Link to={`/video/${video.id}`}>
        <img
          style={{ flexGrow: "1" }}
          className="card-img card-img-style"
          src={video.imageUrl}
          alt={video.name}
        />
      </Link>
      <div style={{ display: "flex" }}>
        <img
          className="avatar-sm avatar-padding"
          src={video.avatarSrc}
          alt={video.uploadedBy}
        />
        <p>{video.description}</p>
        {removeFromHistory && (
          <button
            className="icon-button card-remove button-style"
            onClick={() => {
              removeFromHistoryHandler(video.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};
