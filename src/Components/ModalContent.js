import { useParams } from "react-router-dom";
import { useData, ActionTypes } from "../Context";
import { useState } from "react";
export const ModalContent = () => {
  const { videoId } = useParams();
  const {
    state: { playlists },
    dispatch,
  } = useData();
  const [addPlaylistToggler, setAddPlaylistToggler] = useState(false);
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
    <div>
      <div className="display-flex">
        <h3>Playlists </h3>
        <button
          className="icon-button button-style"
          onClick={() => setAddPlaylistToggler((display) => !display)}
        >
          <i class="fas fa-plus"></i> ADD PLAYLIST
        </button>
      </div>
      <div>
        <ul>
          {playlists.length === 0 && <h2>No playlists Available</h2>}
          {playlists.map((playlist) => (
            <>
              <label className="display-flex">
                <input
                  type="checkbox"
                  checked={checkIfInPlaylist({
                    videoId: videoId,
                    playlistVideos: playlist.videos,
                  })}
                  onClick={() =>
                    playlistCheckBoxHandler({
                      videoId: videoId,
                      playlistVideos: playlist.videos,
                      playlistId: playlist.id,
                    })
                  }
                />
                <p>{playlist.name}</p>
                <button
                  className="icon-button button-style"
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.DELETE_PLAYLIST,
                      payload: playlist.id,
                    });
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </label>
            </>
          ))}
        </ul>
      </div>
      {addPlaylistToggler && (
        <AddPlaylistSection closeHandler={() => setAddPlaylistToggler(false)} />
      )}
    </div>
  );
};

const AddPlaylistSection = ({ closeHandler }) => {
  const { dispatch } = useData();
  const [playlistName, setPlaylistName] = useState("");
  const changeHandler = (e) => {
    setPlaylistName(e.target.value);
  };
  const addPlaylistHandler = () => {
    dispatch({
      type: ActionTypes.CREATE_PLAYLIST,
      payload: playlistName,
    });
    setPlaylistName("");
    closeHandler();
  };
  return (
    <div className="display-flex">
      <input
        className="playlist-input"
        type="text"
        value={playlistName}
        onChange={changeHandler}
      />
      <button
        disabled={playlistName.length === 0 ? true : false}
        onClick={addPlaylistHandler}
        className="button button-border"
      >
        Add
      </button>
    </div>
  );
};

const checkIfInPlaylist = ({ videoId, playlistVideos }) => {
  if (playlistVideos.includes(videoId)) {
    return true;
  } else {
    return false;
  }
};
