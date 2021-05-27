import axios from "axios";
export const removeFromLiked = async ({ videoId, token }) => {
  let response = {};
  try {
    response = await axios({
      url: "https://learn-finance-backend.herokuapp.com/api/videos/history",
      method: "delete",
      data: { videoId },
      headers: { authorization: token },
    });
  } catch (err) {
    response.data = {
      success: false,
      message: "Error in adding video to liked videos",
    };
  }
  return response.data;
};

export const createNewPlaylist = async ({ playlistName, token }) => {
  let response = {};
  try {
    response = await axios.post(
      "https://learn-finance-backend.herokuapp.com/api/playlists",
      {
        name: playlistName,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: "Error in adding creating new Playlist",
    };
  }
  return response.data;
};

export const removePlaylist = async ({ playlistId, token }) => {
  let response = {};
  try {
    response = await axios({
      url: `https://learn-finance-backend.herokuapp.com/api/playlists/${playlistId}`,
      method: "delete",
      headers: { authorization: token },
    });
  } catch (err) {
    console.log(err);
    response.data = {
      success: false,
      message: "Error deleting playlist",
    };
  }
  return response.data;
};

export const addVideoToPlaylist = async ({ playlistId, videoId, token }) => {
  let response = {};
  try {
    response = await axios.post(
      `https://learn-finance-backend.herokuapp.com/api/playlists/${playlistId}/videos`,
      {
        videoId,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: "Error in adding video to playlist",
    };
  }
  return response.data;
};

export const removeVideoFromPlaylist = async ({
  playlistId,
  videoId,
  token,
}) => {
  let response = {};
  try {
    response = await axios({
      url: `https://learn-finance-backend.herokuapp.com/api/playlists/${playlistId}/videos/${videoId}`,
      method: "delete",
      headers: { authorization: token },
    });
  } catch (err) {
    console.log(err);
    response.data = {
      success: false,
      message: "Error removing video from playlist",
    };
  }
  return response.data;
};
