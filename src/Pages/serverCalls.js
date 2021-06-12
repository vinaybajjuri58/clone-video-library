import axios from "axios";
export const loginUser = async ({ email, password }) => {
  let response = {};
  try {
    response = await axios.post(
      "https://learn-finance-backend.herokuapp.com/api/users/login",
      {
        email,
        password,
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: "Login Failed",
    };
  }
  return response.data;
};

export const signUpUser = async ({ email, name, password }) => {
  let response = {};
  try {
    response = await axios.post(
      "https://learn-finance-backend.herokuapp.com/api/users/signup",
      {
        email,
        name,
        password,
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: "Signup Failed",
    };
  }
  return response.data;
};

export const likeVideo = async ({ videoId, token }) => {
  let response = {};
  try {
    response = await axios.post(
      "https://learn-finance-backend.herokuapp.com/api/videos/liked",
      {
        videoId: videoId,
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
      message: "Error in adding video to liked videos",
    };
  }
  return response.data;
};

export const removeFromLiked = async ({ videoId, token }) => {
  let response = {};
  try {
    response = await axios({
      url: "https://learn-finance-backend.herokuapp.com/api/videos/liked",
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

export const addToHistory = async ({ videoId, token }) => {
  let response = {};
  try {
    response = await axios.post(
      "https://learn-finance-backend.herokuapp.com/api/videos/history",
      {
        videoId: videoId,
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
      message: "Error in adding video to history",
    };
  }
  return response.data;
};
