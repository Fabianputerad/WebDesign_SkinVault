import React, { useState } from "react";
import "./SearchBar.css"; // File CSS untuk styling

const SearchBar = ({ handleChange, searchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
