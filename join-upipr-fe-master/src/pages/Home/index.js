import React, { useState } from "react";
import logo from "./star-wars-logo.png";
import { MdSearch } from "react-icons/md";

import "./index.css";

function HomePage() {
  const [query, setQuery] = useState(" ");

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="div-input">
        <input className="search-input" placeholder="Search by name" />
        <MdSearch className="search-icon" />
      </div>
    </div>
  );
}

export default HomePage;
