import { useParams } from "react-router-dom";
import { useData, ActionTypes, useAuth } from "../Context";
import {
  createNewPlaylist,
  removePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "./serverCalls";
import { useState } from "react";
export const ModalContent = () => {
  const { videoId } = useParams();
  const {
    state: { playlists },
    dispatch,
    showSnackBar,
    setSnackBarContent,
  } = useData();
  const {
    authState: { isLoggedIn, userToken },
  } = useAuth();
  const [addPlaylistToggler, setAddPlaylistToggler] = useState(false);
  const playlistCheckBoxHandler = async ({
    videoId,
    playlistVideos,
    playlistId,
    playlistName,
  }) => {
    if (checkIfInPlaylist({ videoId, playlistVideos })) {
      const data = await removeVideoFromPlaylist({
        playlistId: playlistId,
        videoId: videoId,
        token: userToken,
      });
      if (data.success === true) {
        setSnackBarContent(`Video Removed from playlist : ${playlistName}`);
        showSnackBar();
        dispatch({
          type: ActionTypes.REMOVE_FROM_PLAYLIST,
          payload: { videoId, playlistId },
        });
      } else {
        setSnackBarContent("Error in removing video from playlist");
        showSnackBar();
      }
    } else {
      const data = await addVideoToPlaylist({
        playlistId: playlistId,
        videoId: videoId,
        token: userToken,
      });
      if (data.success === true) {
        setSnackBarContent(`Video Added to playlist : ${playlistName}`);
        showSnackBar();
        dispatch({
          type: ActionTypes.ADD_TO_PLAYLIST,
          payload: { videoId, playlistId },
        });
      } else {
        setSnackBarContent(`Error in removing video from playlist`);
        showSnackBar();
      }
    }
  };
  const playlistDeleteHandler = async ({ playlist }) => {
    if (isLoggedIn) {
      const data = await removePlaylist({
        playlistId: playlist.id,
        token: userToken,
      });
      if (data.success === true) {
        setSnackBarContent(`Deleted playlist : ${playlist.name}`);
        showSnackBar();
        dispatch({
          type: ActionTypes.DELETE_PLAYLIST,
          payload: playlist.id,
        });
      } else {
        setSnackBarContent("Error in deleting playlist");
        showSnackBar();
      }
    } else {
      setSnackBarContent(`Login to delete playlist`);
      showSnackBar();
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
        {playlists.length === 0 && <h2>No playlists Available</h2>}
        <ul className="playlists">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="single-playlist">
              <label className="single-playlist">
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
              </label>
              <button
                className="icon-button button-style"
                onClick={() => playlistDeleteHandler({ playlist: playlist })}
              >
                <i className="fas fa-trash"></i>
              </button>
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
  const {
    authState: { isLoggedIn, userToken },
  } = useAuth();
  const changeHandler = (e) => {
    setPlaylistName(e.target.value);
  };
  const addPlaylistHandler = async () => {
    if (isLoggedIn) {
      const data = await createNewPlaylist({
        playlistName: playlistName,
        token: userToken,
      });
      if (data.success === true) {
        setSnackBarContent(`Added Playlist : ${playlistName}`);
        showSnackBar();
        dispatch({
          type: ActionTypes.CREATE_PLAYLIST,
          payload: {
            playlistName: data.playlist.name,
            id: data.playlist.id,
          },
        });
        setPlaylistName("");
        closeHandler();
      } else {
        setSnackBarContent(`Error in adding new playlist`);
        showSnackBar();
      }
    } else {
      setSnackBarContent(`Login to create playlist`);
      showSnackBar();
    }
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
