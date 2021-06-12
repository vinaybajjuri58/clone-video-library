import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context";

export const PrivateRoute = ({ path, ...props }) => {
  const { authState } = useAuth();
  return authState.isLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
