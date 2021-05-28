import { useParams } from "react-router-dom";
// import YouTube from "react-youtube";
import { VideoList } from "./VideoList";
import { ActionTypes, useData, useAuth } from "../Context";
import { YoutubeVideoDisplay, PlaylistModal } from "../Components";
import { useEffect, useRef, useState } from "react";
import { useDocumentTitle } from "../customHooks";
import { likeVideo, removeFromLiked } from "./serverCalls";
import axios from "axios";
export const Video = () => {
  const { videoId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);
  const { state } = useData();
  let video = state.videos.find((item) => item.id === videoId);
  const videoRef = useRef(video);
  useEffect(() => {
    if (video === undefined) {
      (async () => {
        try {
          const {
            data: { success, video: responseVideo },
          } = await axios.get(
            `https://learn-finance-backend.herokuapp.com/api/videos/${videoId}`
          );
          if (success === true) {
            videoRef.current = responseVideo;
            console.log(responseVideo);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);
  return (
    <div>
      <VideoDisplay video={video} />
      <VideoList />
    </div>
  );
};

const VideoDisplay = ({ video }) => {
  const { state, dispatch, showSnackBar, setSnackBarContent } = useData();
  const {
    authState: { isLoggedIn, userToken },
  } = useAuth();
  const [displayModal, setDisplayModal] = useState("none");

  useDocumentTitle(video ? video.description : "Learn Finance");

  const removeFromLikedHandler = () => {
    setSnackBarContent(`Removed from Liked videos`);
    showSnackBar();
    dispatch({
      type: ActionTypes.REMOVE_FROM_LIKED,
      payload: video,
    });
  };
  const addToLikedHandler = async () => {
    if (isLoggedIn) {
      const data = await likeVideo({ videoId: video.id, token: userToken });
      if (data.success === true) {
        setSnackBarContent(`Added to Liked Videos`);
        showSnackBar();
        dispatch({
          type: ActionTypes.ADD_TO_LIKED,
          payload: video,
        });
      } else {
        setSnackBarContent("Error in adding to liked");
        showSnackBar();
      }
    } else {
      setSnackBarContent("Please Login");
      showSnackBar();
    }
  };
  const dislikeButtonHandler = async () => {
    if (isLoggedIn) {
      if (inLikedVideos({ id: video.id, likedVideos: state.liked })) {
        const data = await removeFromLiked({
          videoId: video.id,
          token: userToken,
        });
        if (data.success === true) {
          removeFromLikedHandler();
        } else {
          setSnackBarContent("Error in removing from liked");
          showSnackBar();
        }
      } else {
        setSnackBarContent("Video is not present in liked videos");
        showSnackBar();
      }
    } else {
      setSnackBarContent("Please Login");
      showSnackBar();
    }
  };
  const playlistButtonHandler = () => {
    if (isLoggedIn) {
      setDisplayModal("block");
    } else {
      setSnackBarContent("Please Login");
      showSnackBar();
    }
  };

  if (video === undefined) {
    return (
      <div>
        <h3>Loading</h3>
      </div>
    );
  } else {
    return (
      <div>
        <div className="iframe-container">
          <YoutubeVideoDisplay youtubeId={video.videoId} />
        </div>
        <PlaylistModal
          displayState={displayModal}
          setDisplayState={setDisplayModal}
        />
        <div>
          <div style={{ display: "flex" }}>
            <div className="avatar-container-sm avatar-padding">
              <img
                className="avatar avatar-padding"
                src={video.avatarSrc}
                alt={video.uploadedBy}
              />
            </div>
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
                onClick={dislikeButtonHandler}
              >
                <i class="fas fa-thumbs-up"></i>
              </button>
            ) : (
              <button
                className="icon-button button-style"
                onClick={addToLikedHandler}
              >
                <i class="far fa-thumbs-up"> </i>
              </button>
            )}

            <button
              className="icon-button button-style"
              onClick={dislikeButtonHandler}
            >
              <i class="far fa-thumbs-down"></i>
            </button>
            <button
              className="icon-button button-style"
              onClick={playlistButtonHandler}
            >
              <i class="fas fa-bars"></i> ADD TO PLAYLIST
            </button>
          </div>
        </div>
      </div>
    );
  }
};

function inLikedVideos({ id, likedVideos }) {
  const inliked = likedVideos.find((item) => item.id === id);
  if (inliked === undefined) {
    return false;
  }
  return true;
}
