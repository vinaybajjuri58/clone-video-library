import { useAuth } from "../Context";
import { SearchBar } from "./SearchBar";
export const Navbar = () => {
  const { authState } = useAuth();
  return (
    <div className="navbar">
      <h2 className="logo">Learn Finance</h2>
      <SearchBar />
      {authState.isLoggedIn ? "loggedIn" : "LoggedOut"}
    </div>
  );
};
