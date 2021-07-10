import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData, useAuth, AuthActionTypes } from "../Context";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../customHooks";
import { loginUser } from "./serverCalls";
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
  const handleSubmit = async () => {
    const data = await loginUser({
      email: loginData.email,
      password: loginData.password,
    });
    if (data.success === true) {
      authDispatch({
        type: AuthActionTypes.SET_LOGGED_IN,
        payload: {
          token: data.token,
        },
      });
      const loginTime = new Date().getTime();
      localStorage?.setItem(
        "login",
        JSON.stringify({
          isLoggedIn: true,
          userToken: data.token,
          expiry: loginTime + 64800000,
        })
      );
      setLoginData(initialLoginData);
      navigate(state?.from ? state.from : "/");
    } else {
      setSnackBarContent("Login Failed");
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
          className="button button-border border-primary button-style-margin auth-buttons"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <Link
        className="button button-border border-primary auth-buttons"
        to="/signup"
      >
        signup
      </Link>
    </div>
  );
};
