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
      break;
    case ActionTypes.REMOVE_FROM_HISTORY:
      break;
    case ActionTypes.CLEAR_HISTORY:
      break;
    case ActionTypes.ADD_TO_LIKED:
      break;
    case ActionTypes.REMOVE_FROM_LIKED:
      break;
    default:
      return state;
  }
};
