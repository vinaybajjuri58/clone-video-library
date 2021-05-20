import * as ActionTypes from "./ActionTypes";
export const ReducerFunction = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case ActionTypes.ADD_TO_PLAYLIST:
      return {
        ...state,
        playlists: addToPlaylist({
          playlists: state.playlists,
          playlistId: action.payload.playlistId,
          videoId: action.payload.videoId,
        }),
      };
    case ActionTypes.REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        playlists: removeFromPlaylist({
          playlists: state.playlists,
          playlistId: action.payload.playlistId,
          videoId: action.payload.videoId,
        }),
      };
    case ActionTypes.CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          { id: state.playlists.length + 1, name: action.payload, videos: [] },
        ],
      };
    case ActionTypes.DELETE_PLAYLIST:
      return {
        ...state,
        playlists: deletePlaylist({
          playlists: state.playlists,
          playlistId: action.payload,
        }),
      };
    case ActionTypes.ADD_TO_HISTORY:
      return {
        ...state,
        history: addToHistory({
          history: state.history,
          newVideo: action.payload,
        }),
      };
    case ActionTypes.REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: removeFromHistory({
          history: state.history,
          videoId: action.payload,
        }),
      };
    case ActionTypes.CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };
    case ActionTypes.ADD_TO_LIKED:
      return {
        ...state,
        liked: addtoLiked({ liked: state.liked, newVideo: action.payload }),
      };
    case ActionTypes.REMOVE_FROM_LIKED:
      return {
        ...state,
        liked: removeFromLiked({
          liked: state.liked,
          videoToRemove: action.payload,
        }),
      };
    default:
      return state;
  }
};
function deletePlaylist({ playlists, playlistId }) {
  return playlists.filter((item) => item.id !== playlistId);
}
function removeFromPlaylist({ playlists, playlistId, videoId }) {
  const playlist = playlists.find((item) => item.id === playlistId);
  const newPlaylist = {
    ...playlist,
    videos: playlist.videos.filter((item) => item !== videoId),
  };
  return playlists.map((item) => (item.id === playlistId ? newPlaylist : item));
}
function addToPlaylist({ playlists, playlistId, videoId }) {
  const playlist = playlists.find((item) => item.id === playlistId);
  if (playlist.videos.includes(videoId)) {
    return playlists;
  } else {
    playlist.videos.push(videoId);
    return playlists.map((item) => (item.id === playlistId ? playlist : item));
  }
}

function removeFromHistory({ history, videoId }) {
  return history.filter((item) => item.videoId !== videoId);
}

function addToHistory({ history, newVideo }) {
  const inHistory = history.find((item) => item.videoId === newVideo.videoId);
  if (inHistory === undefined) {
    return [...history, newVideo];
  }
  return history;
}
function addtoLiked({ liked, newVideo }) {
  const inLiked = liked.find((item) => item.videoId === newVideo.videoId);
  if (inLiked === undefined) {
    return [...liked, newVideo];
  }
  return liked;
}
function removeFromLiked({ liked, videoToRemove }) {
  const inLiked = liked.find((item) => item.videoId === videoToRemove.videoId);
  if (inLiked === undefined) {
    return liked;
  }
  return liked.filter((item) => item.videoId !== videoToRemove.videoId);
}
