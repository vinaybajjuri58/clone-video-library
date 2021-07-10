import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData, useAuth } from "../Context";
import { useDocumentTitle } from "../customHooks";
import { signUpUser } from "./serverCalls";
const initialSignupData = {
  email: "",
  name: "",
  password: "",
};
export const Signup = () => {
  const { authState } = useAuth();
  const { showSnackBar, setSnackBarContent } = useData();
  const [signupData, setSignUpData] = useState(initialSignupData);
  const navigate = useNavigate();
  useDocumentTitle("Signup | Learn Finance");
  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);
  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    const data = await signUpUser({
      email: signupData.email,
      name: signupData.name,
      password: signupData.password,
    });
    if (data.success === true) {
      setSnackBarContent("User registered successfully");
      showSnackBar();
      setSignUpData(initialSignupData);
      navigate("/login");
    } else {
      setSnackBarContent("Signup failed");
      showSnackBar();
    }
  };
  return (
    <div className="login-container">
      <label>
        <p className="label-styles">Name :</p>
        <input
          className="input-field"
          type="text"
          value={signupData["name"]}
          name="name"
          onChange={handleChange}
        />
      </label>
      <label>
        <p className="label-styles">Email :</p>
        <input
          className="input-field"
          type="text"
          value={signupData["email"]}
          name="email"
          onChange={handleChange}
        />
      </label>
      <label>
        <p className="label-styles">Password :</p>
        <input
          className="input-field"
          type="password"
          value={signupData["password"]}
          name="password"
          onChange={handleChange}
        />
      </label>
      <div>
        <button
          className="button button-border border-primary button-style-margin auth-buttons"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </div>
    </div>
  );
};
