import { initialState } from "./DataProvider";
import * as ActionTypes from "./ActionTypes";
import { ReducerFunction } from "./ReducerFunction";
const video = {
  id: "n3KNJG3inAk",
  description: "Why we all are getting poor | Inflation",
  uploadedBy: "Honestly by Tanmay Bhat",
  avatarSrc:
    "https://yt3.ggpht.com/ytc/AAUvwnjhWBsemL-_0qiUL8CBztox-E6ZmYcVYW-ZxEPQ=s88-c-k-c0x00ffffff-no-rj",
  imageUrl:
    "https://i.ytimg.com/vi/n3KNJG3inAk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLDHzXQfIPJBziQnDb3ECz0KTgK3Zw",
};
const playlist = {
  id: 99,
  name: "Testing playlist",
  videos: [],
};
describe("Testing liked functionalities", () => {
  it("Testing Add to like", () => {
    const action = {
      type: ActionTypes.ADD_TO_LIKED,
      payload: video,
    };
    const state = ReducerFunction(initialState, action);
    expect(state).toEqual({
      ...initialState,
      liked: [video],
    });
  });
  it("Testing Remove from like functionalities", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_LIKED,
      payload: video,
    };
    const state = ReducerFunction({ ...initialState, liked: [video] }, action);
    expect(state).toEqual(initialState);
  });
});
describe("Testing History functionalities", () => {
  it("Testing Add to History", () => {
    const action = {
      type: ActionTypes.ADD_TO_HISTORY,
      payload: video,
    };
    const state = ReducerFunction(initialState, action);
    expect(state).toEqual({
      ...initialState,
      history: [video],
    });
  });
  it("Testing Remove from History functionalities", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_HISTORY,
      payload: video.id,
    };
    const state = ReducerFunction(
      { ...initialState, history: [video] },
      action
    );
    expect(state).toEqual(initialState);
  });
  it("Testing clear history functionality", () => {
    const action = {
      type: ActionTypes.CLEAR_HISTORY,
    };
    const state = ReducerFunction(
      { ...initialState, history: [video] },
      action
    );
    expect(state).toEqual(initialState);
  });
});
describe("Testing Playlist Functionality", () => {
  it("Testing create playlist functionality", () => {
    const action = {
      type: ActionTypes.CREATE_PLAYLIST,
      payload: "testing playlist",
    };
    const state = ReducerFunction({ ...initialState, playlists: [] }, action);
    expect(state).toEqual({
      ...initialState,
      playlists: [{ id: 1, name: action.payload, videos: [] }],
    });
  });
  it("Testing delete playlist functionality", () => {
    const action = {
      type: ActionTypes.DELETE_PLAYLIST,
      payload: playlist.id,
    };
    const state = ReducerFunction(
      { ...initialState, playlists: [...initialState.playlists, playlist] },
      action
    );
    expect(state).toEqual(initialState);
  });
  it("Testing Add video to playlist functionality", () => {
    const action = {
      type: ActionTypes.ADD_TO_PLAYLIST,
      payload: {
        videoId: video.id,
        playlistId: playlist.id,
      },
    };
    const state = ReducerFunction(
      { ...initialState, playlists: [playlist] },
      action
    );
    expect(state).toEqual({
      ...initialState,
      playlists: [{ ...playlist, videos: [video.id] }],
    });
  });
  it("Tesing remove video from playlist", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_PLAYLIST,
      payload: {
        videoId: video.id,
        playlistId: playlist.id,
      },
    };
    const state = ReducerFunction(
      { ...initialState, playlists: [{ ...playlist, videos: [video.id] }] },
      action
    );
    expect(state).toEqual({
      ...initialState,
      playlists: [{ ...playlist, videos: [] }],
    });
  });
});
