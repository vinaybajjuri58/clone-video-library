import * as ActionTypes from "./ActionTypes";
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
      break;
    case ActionTypes.CLEAR_HISTORY:
      break;
    case ActionTypes.ADD_TO_LIKED:
      return {
        ...state,
        liked: addtoLiked({ liked: state.liked, newVideo: action.payload }),
      };
    case ActionTypes.REMOVE_FROM_LIKED:
      break;
    default:
      return state;
  }
};
