import { NavLink, Link } from "react-router-dom";
import { useAuth, AuthActionTypes } from "../Context";
// import { SearchBar } from "./SearchBar";
export const Navbar = () => {
  const { authState, authDispatch } = useAuth();
  const logoutHandler = () => {
    localStorage?.removeItem("login");
    authDispatch({
      type: AuthActionTypes.SET_LOGOUT,
    });
  };
  return (
    <div className="navbar-content">
      <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
        <h2 className="logo">Learn Finance</h2>
      </NavLink>
      {/* <SearchBar /> */}
      {authState.isLoggedIn ? (
        <div style={{ display: "flex" }}>
          <div className="avatar-container-sm avatar-padding">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              alt="User Name"
            />
            <span className="user-status loggedIn"></span>
          </div>
          <button
            className="button button-border border-warning"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="button button-border border-primary auth-buttons">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};
