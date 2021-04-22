import { useParams } from "react-router-dom";
import { useData, ActionTypes } from "../Context";
import { useState } from "react";
export const ModalContent = () => {
  const { videoId } = useParams();
  const {
    state: { playlists },
    dispatch,
    showSnackBar,
    setSnackBarContent,
  } = useData();
  const [addPlaylistToggler, setAddPlaylistToggler] = useState(false);
  const playlistCheckBoxHandler = ({
    videoId,
    playlistVideos,
    playlistId,
    playlistName,
  }) => {
    if (checkIfInPlaylist({ videoId, playlistVideos })) {
      setSnackBarContent(`Video Removed from playlist : ${playlistName}`);
      showSnackBar();
      dispatch({
        type: ActionTypes.REMOVE_FROM_PLAYLIST,
        payload: { videoId, playlistId },
      });
    } else {
      setSnackBarContent(`Video Added to playlist : ${playlistName}`);
      showSnackBar();
      dispatch({
        type: ActionTypes.ADD_TO_PLAYLIST,
        payload: { videoId, playlistId },
      });
    }
  };
  const playlistDeleteHandler = ({ playlist }) => {
    setSnackBarContent(`Deleted playlist : ${playlist.name}`);
    showSnackBar();
    dispatch({
      type: ActionTypes.DELETE_PLAYLIST,
      payload: playlist.id,
    });
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
            <div key={playlist.id}>
              <label className="display-flex">
                <input
                  type="checkbox"
                  checked={checkIfInPlaylist({
                    videoId: videoId,
                    playlistVideos: playlist.videos,
                  })}
                  onChange={() =>
                    playlistCheckBoxHandler({
                      videoId: videoId,
                      playlistVideos: playlist.videos,
                      playlistId: playlist.id,
                      playlistName: playlist.name,
                    })
                  }
                />
                <p>{playlist.name}</p>
                <button
                  className="icon-button button-style"
                  onClick={() => playlistDeleteHandler({ playlist: playlist })}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </label>
            </div>
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
  const { dispatch, showSnackBar, setSnackBarContent } = useData();
  const [playlistName, setPlaylistName] = useState("");
  const changeHandler = (e) => {
    setPlaylistName(e.target.value);
  };
  const addPlaylistHandler = () => {
    setSnackBarContent(`Added Playlist : ${playlistName}`);
    showSnackBar();
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
