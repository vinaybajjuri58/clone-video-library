import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData, useAuth, AuthActionTypes } from "../Context";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../customHooks";
import { loginUser } from "./serverCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const Login = () => {
  const { authState, authDispatch } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);
  const { showSnackBar, setSnackBarContent } = useData();
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useDocumentTitle("Login | Learn Finance");
  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);

  const loginHandler = async (data) => {
    setLoginLoading(true);
    const response = await loginUser({
      email: data.email,
      password: data.password,
    });
    setLoginLoading(false);
    if (response.success === true) {
      authDispatch({
        type: AuthActionTypes.SET_LOGGED_IN,
        payload: {
          token: response.token,
        },
      });
      const loginTime = new Date().getTime();
      localStorage?.setItem(
        "login",
        JSON.stringify({
          isLoggedIn: true,
          userToken: response.token,
          expiry: loginTime + 64800000,
        })
      );
      navigate(state?.from ? state.from : "/");
    } else {
      setSnackBarContent("Login Failed");
      showSnackBar();
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(loginHandler)}>
        <label>
          <p className="label-styles">Email :</p>
        </label>
        <input
          className="input-field"
          type="text"
          name="email"
          {...register("email")}
        />
        <p className="error-text">{errors.email?.message}</p>
        <label>
          <p className="label-styles">Password :</p>
        </label>
        <input
          className="input-field"
          type="password"
          name="password"
          {...register("password")}
        />
        <p className="error-text">{errors.password?.message}</p>
        <div className="buttons-container">
          <button
            type="submit"
            className="button button-border border-primary button-style-margin auth-buttons"
          >
            {loginLoading ? "Logging In ..." : "Login"}
          </button>
          <div>
            <Link to="/signup">
              <button className="button button-border border-primary auth-buttons">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
