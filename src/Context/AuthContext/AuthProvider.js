import { useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { reducerFunction } from "./ReducerFunction";
const initialAuthData = JSON.parse(localStorage?.getItem("login")) || {
  isLoggedIn: false,
  userToken: null,
};
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(
    reducerFunction,
    initialAuthData
  );
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
