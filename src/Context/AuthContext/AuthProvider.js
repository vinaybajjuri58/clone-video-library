import { useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { reducerFunction } from "./ReducerFunction";
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducerFunction, {
    isLoggedIn: false,
  });
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
