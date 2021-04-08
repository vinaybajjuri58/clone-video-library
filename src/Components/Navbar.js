import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <nav className="top-navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/liked">Liked</NavLink>
        <NavLink to="/playlists">Playlists</NavLink>
      </nav>
    </div>
  );
};
