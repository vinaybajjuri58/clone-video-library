import { NavLink } from "react-router-dom";
import { useAuth } from "../Context";
// import { SearchBar } from "./SearchBar";
export const Navbar = () => {
  const { authState } = useAuth();
  return (
    <div className="navbar-content">
      <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
        <h2 className="logo">Learn Finance</h2>
      </NavLink>
      {/* <SearchBar /> */}
      <div className="avatar-container-sm avatar-padding">
        <img
          className="avatar"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt="User Name"
        />
        <span
          className={
            authState.isLoggedIn
              ? "user-status loggedIn"
              : "user-status loggedOut"
          }
        ></span>
      </div>
    </div>
  );
};
