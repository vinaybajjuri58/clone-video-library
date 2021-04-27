import * as ActionTypes from "./ActionTypes";
export const reducerFunction = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case ActionTypes.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
