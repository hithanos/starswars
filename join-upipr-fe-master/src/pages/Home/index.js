import React, { useState, useCallback } from "react";
import logo from "./star-wars-logo.png";
import { MdSearch } from "react-icons/md";
import axios from "axios";

import "./index.css";

function HomePage() {
  const [query, setQuery] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState([]);

  const characterFinder = (value) => {
    console.log("API");
    axios
      .get("https://swapi.dev/api/people", {
        params: {
          q: value,
        },
      })
      .then((res) => {
        setSuggestion(res.data);
        setLoading(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err), setLoading(false));
  };
  const debouncing = function (fn, delay) {
    let timerID;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timerID);
      timerID = setTimeout(() => {
        fn.apply(self, args);
      }, delay);
    };
  };
  const debounceData = useCallback(
    debouncing((value) => characterFinder(value), 2000),
    []
  );
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value !== "") {
      debounceData(value);
    }
  };

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="div-input">
        <input
          className="search-input"
          placeholder="Search by name"
          value={query}
          onChange={(e) => handleChange(e)}
        />
        <MdSearch className="search-icon" />
      </div>
    </div>
  );
}

export default HomePage;
