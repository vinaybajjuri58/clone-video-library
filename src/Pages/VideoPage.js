import { useParams } from "react-router-dom";
// import YouTube from "react-youtube";
import { VideoList } from "./VideoList";
import { ActionTypes, useData } from "../Context";
import { YoutubeVideoDisplay, PlaylistModal } from "../Components";
import { useEffect, useState } from "react";
export const Video = () => {
  return (
    <div>
      <VideoDisplay />
      <VideoList />
    </div>
  );
};

const VideoDisplay = () => {
  const { videoId } = useParams();
  const { state, dispatch, showSnackBar, setSnackBarContent } = useData();
  const [displayModal, setDisplayModal] = useState("none");
  const video = state.videos.find((item) => item.id === videoId);
  useEffect(() => {
    document.title = video.description;
  }, [video.description]);
  return (
    <div>
      <div className="iframe-container">
        <YoutubeVideoDisplay youtubeId={videoId} />
      </div>
      <PlaylistModal
        displayState={displayModal}
        setDisplayState={setDisplayModal}
      />
      <div>
        <div style={{ display: "flex" }}>
          <img
            className="avatar-sm avatar-padding"
            src={video.avatarSrc}
            alt={video.uploadedBy}
          />
          <p>{video.description}</p>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          {inLikedVideos({ id: video.id, likedVideos: state.liked }) ? (
            <button
              className="icon-button button-style"
              onClick={() => {
                setSnackBarContent(`Removed from Liked videos`);
                showSnackBar();
                dispatch({
                  type: ActionTypes.REMOVE_FROM_LIKED,
                  payload: video,
                });
              }}
            >
              <i class="fas fa-thumbs-up"></i>
            </button>
          ) : (
            <button
              className="icon-button button-style"
              onClick={() => {
                setSnackBarContent(`Added to Liked Videos`);
                showSnackBar();
                dispatch({
                  type: ActionTypes.ADD_TO_LIKED,
                  payload: video,
                });
              }}
            >
              <i class="far fa-thumbs-up"> </i>
            </button>
          )}

          <button
            className="icon-button button-style"
            onClick={() => {
              if (inLikedVideos({ id: video.id, likedVideos: state.liked })) {
                setSnackBarContent(`Removed from Liked Videos`);
                showSnackBar();
                dispatch({
                  type: ActionTypes.REMOVE_FROM_LIKED,
                  payload: video,
                });
              } else {
                setSnackBarContent("Video is not present in liked videos");
                showSnackBar();
              }
            }}
          >
            <i class="far fa-thumbs-down"></i>
          </button>
          <button
            className="icon-button button-style"
            onClick={() => {
              setDisplayModal("block");
            }}
          >
            <i class="fas fa-bars"></i> ADD TO PLAYLIST
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
