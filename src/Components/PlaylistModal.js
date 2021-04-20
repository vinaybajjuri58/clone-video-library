import { useParams } from "react-router-dom";
import { useData, ActionTypes } from "../Context";
export const PlaylistModal = ({ displayState, setDisplayState }) => {
  return (
    <div
      id="modal"
      style={{
        display: displayState,
      }}
      className="modal"
    >
      <div className="modal-content modal-theme">
        <ModalContent />
        <span className="close-modal">
          <button
            id="close-modal"
            onClick={() => setDisplayState("none")}
            className="button button-warning modal-toggle"
          >
            X
          </button>
        </span>
      </div>
    </div>
  );
};
const ModalContent = () => {
  const { videoId } = useParams();
  const {
    state: { playlists },
    dispatch,
  } = useData();
  const playlistCheckBoxHandler = ({ videoId, playlistVideos, playlistId }) => {
    if (checkIfInPlaylist({ videoId, playlistVideos })) {
      dispatch({
        type: ActionTypes.REMOVE_FROM_PLAYLIST,
        payload: { videoId, playlistId },
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_TO_PLAYLIST,
        payload: { videoId, playlistId },
      });
    }
  };
  return (
    <ul>
      {playlists.map((item) => (
        <>
          <label
            style={{
              display: "flex",
            }}
          >
            <input
              type="checkbox"
              checked={checkIfInPlaylist({
                videoId: videoId,
                playlistVideos: item.videos,
              })}
              onClick={() =>
                playlistCheckBoxHandler({
                  videoId: videoId,
                  playlistVideos: item.videos,
                  playlistId: item.id,
                })
              }
            />
            <p>{item.name}</p>
          </label>
        </>
      ))}
    </ul>
  );
};
const checkIfInPlaylist = ({ videoId, playlistVideos }) => {
  if (playlistVideos.includes(videoId)) {
    return true;
  } else {
    return false;
  }
};
