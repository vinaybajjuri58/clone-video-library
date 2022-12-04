import { useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { reducerFunction } from "./ReducerFunction";

function getWithExpiry() {
  const initialAuthData = {
    isLoggedIn: false,
    userToken: null,
  };
  const itemStr = localStorage?.getItem("login");
  if (!itemStr) {
    return initialAuthData;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("login");
    return initialAuthData;
  }
  return item;
}

export const AuthProvider = ({ children }) => {
  const initialAuthData = getWithExpiry();
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
