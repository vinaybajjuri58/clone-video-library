import { NavLink } from "react-router-dom";
export const Sidebar = () => {
  return (
    <div>
      <nav className="sidebar">
        <NavLink
          className="sidebar-item"
          activeClassName="sidebar-active-class"
          to="/"
          end
        >
          <i className="fas fa-home"></i>
          <p className="sidebar-item-name">Home</p>
        </NavLink>
        <NavLink
          className="sidebar-item"
          activeClassName="sidebar-active-class"
          to="/history"
        >
          <i className="fas fa-history"></i>{" "}
          <p className="sidebar-item-name">History</p>
        </NavLink>
        <NavLink
          className="sidebar-item"
          activeClassName="sidebar-active-class"
          to="/liked"
        >
          <i className="far fa-thumbs-up"></i>{" "}
          <p className="sidebar-item-name">Liked</p>
        </NavLink>
        <NavLink
          className="sidebar-item"
          activeClassName="sidebar-active-class"
          to="/playlists"
        >
          <i className="fas fa-bars"></i>{" "}
          <p className="sidebar-item-name">Playlists</p>
        </NavLink>
      </nav>
    </div>
  );
};
