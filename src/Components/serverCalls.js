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
