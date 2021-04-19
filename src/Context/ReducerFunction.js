import * as ActionTypes from "./ActionTypes";
export const ReducerFunction = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_PLAYLIST:
      break;
    case ActionTypes.REMOVE_FROM_PLAYLIST:
      break;
    case ActionTypes.CREATE_PLAYLIST:
      break;
    case ActionTypes.DELETE_PLAYLIST:
      break;
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
        history: removeFormHistory({
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

function removeFormHistory({ history, videoId }) {
  return history.filter((item) => item.id !== videoId);
}

function addToHistory({ history, newVideo }) {
  const inHistory = history.find((item) => item.id === newVideo.id);
  if (inHistory === undefined) {
    return [...history, newVideo];
  }
  return history;
}
function addtoLiked({ liked, newVideo }) {
  const inLiked = liked.find((item) => item.id === newVideo.id);
  if (inLiked === undefined) {
    return [...liked, newVideo];
  }
  return liked;
}
function removeFromLiked({ liked, videoToRemove }) {
  const inLiked = liked.find((item) => item.id === videoToRemove.id);
  if (inLiked === undefined) {
    return liked;
  }
  return liked.filter((item) => item.id !== videoToRemove.id);
}
