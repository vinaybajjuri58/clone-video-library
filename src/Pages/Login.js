import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData, useAuth, AuthActionTypes } from "../Context";
const initialLoginData = {
  email: "",
  password: "",
};
export const Login = () => {
  const { authState, authDispatch } = useAuth();
  const { showSnackBar, setSnackBarContent } = useData();
  const [loginData, setLoginData] = useState(initialLoginData);
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    if (
      loginData.email === "neog@gmail.com" &&
      loginData.password === "neog@123"
    ) {
      authDispatch({
        type: AuthActionTypes.SET_LOGGED_IN,
      });
      setLoginData(initialLoginData);
      navigate(state?.from ? state.from : "/");
    } else {
      setSnackBarContent("Check login Details");
      showSnackBar();
    }
  };
  return authState.isLoggedIn === false ? (
    <div>
      <label>
        <p>Email :</p>
        <input
          type="text"
          value={loginData["email"]}
          name="email"
          onChange={handleChange}
        />
      </label>
      <label>
        <p>Password :</p>
        <input
          type="password"
          value={loginData["password"]}
          name="password"
          onChange={handleChange}
        />
      </label>
      <div>
        <button
          className="button button-border border-primary button-style-margin"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <div>
        <p>Temporary Login Details</p>
        <p>Email : neog@gmail.com</p>
        <p>Password: neog@123</p>
      </div>
    </div>
  ) : (
    <div>
      <button
        className="button button-border border-warning"
        onClick={() => {
          authDispatch({
            type: AuthActionTypes.SET_LOGOUT,
          });
        }}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};
