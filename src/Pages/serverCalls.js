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
