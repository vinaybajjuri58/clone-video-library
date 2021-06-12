import { NavLink } from "react-router-dom";
export const Sidebar = () => {
  return (
    <div>
      <nav className="sidebar">
        <NavLink className="sidebar-item" to="/">
          <i class="fas fa-home"></i>
          <p className="sidebar-item-name">Home</p>
        </NavLink>
        <NavLink className="sidebar-item" to="/history">
          <i class="fas fa-history"></i>{" "}
          <p className="sidebar-item-name">History</p>
        </NavLink>
        <NavLink className="sidebar-item" to="/liked">
          <i class="far fa-thumbs-up"></i>{" "}
          <p className="sidebar-item-name">Liked</p>
        </NavLink>
        <NavLink className="sidebar-item" to="/playlists">
          <i class="fas fa-bars"></i>{" "}
          <p className="sidebar-item-name">Playlists</p>
        </NavLink>
      </nav>
    </div>
  );
};
