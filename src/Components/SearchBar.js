import { useState } from "react";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        value={searchText}
        onChange={handleChange}
      />
      <button className="icon-button button-style">
        <i class="fas fa-search"></i>
      </button>
    </div>
  );
};
