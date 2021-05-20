import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData, useAuth, AuthActionTypes } from "../Context";
import { useDocumentTitle } from "../customHooks";
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
  useDocumentTitle("Login | Learn Finance");
  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);
  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    if (
      loginData.email === "admin@gmail.com" &&
      loginData.password === "admin@123"
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
  return (
    <div className="login-container">
      <label>
        <p className="label-styles">Email :</p>
        <input
          className="input-field"
          type="text"
          value={loginData["email"]}
          name="email"
          onChange={handleChange}
        />
      </label>
      <label>
        <p className="label-styles">Password :</p>
        <input
          className="input-field"
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
        <p>Email : admin@gmail.com</p>
        <p>Password: admin@123</p>
      </div>
    </div>
  );
};
