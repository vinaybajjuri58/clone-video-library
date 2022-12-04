import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData, useAuth } from "../Context";
import { useDocumentTitle } from "../customHooks";
import { signUpUser } from "./serverCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const Signup = () => {
  const { authState } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { showSnackBar, setSnackBarContent } = useData();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const navigate = useNavigate();
  useDocumentTitle("Signup | Learn Finance");
  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);

  const signUpHandler = async (data) => {
    setSignUpLoading(true);
    const response = await signUpUser({
      email: data.email,
      name: data.name,
      password: data.password,
    });
    setSignUpLoading(false);
    if (response.success === true) {
      setSnackBarContent("User registered successfully");
      showSnackBar();
      navigate("/login");
    } else {
      setSnackBarContent("Signup failed");
      showSnackBar();
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(signUpHandler)}>
        <label>
          <p className="label-styles">Name :</p>{" "}
        </label>
        <input
          className="input-field"
          type="text"
          name="name"
          {...register("name")}
        />
        <p className="error-text">{errors.name?.message}</p>
        <label>
          <p className="label-styles">Email :</p>{" "}
        </label>
        <input
          className="input-field"
          type="text"
          name="email"
          {...register("email")}
        />
        <p className="error-text">{errors.email?.message}</p>
        <label>
          <p className="label-styles">Password :</p>{" "}
        </label>
        <input
          className="input-field"
          type="password"
          name="password"
          {...register("password")}
        />
        <p className="error-text">{errors.password?.message}</p>
        <div>
          <button
            className="button button-border border-primary button-style-margin auth-buttons"
            type="submit"
          >
            {signUpLoading ? "Signing Up" : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
};
