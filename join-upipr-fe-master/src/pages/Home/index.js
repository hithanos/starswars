import React, { useState, useCallback } from "react";
import logo from "./star-wars-logo.png";
import { MdSearch } from "react-icons/md";
import { Person } from "../Person/Person";
import axios from "axios";

import "./index.css";

function HomePage() {
  const [query, setQuery] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [dropDownActive, setdropDownActive] = useState(true);
  const [suggestion, setSuggestion] = useState([]);

  //calling the get method with axios
  function characterFinder(value) {
    console.log("API");
    setLoading(true);
    return axios
      .get(`https://swapi.dev/api/people/?search=${value}`)
      .then((res) => {
        setSuggestion(res.data.results);
      })
      .catch((err) => console.log(err), setLoading(false))
      .finally(() => {
        setLoading(false);
      });
  }
  //using the function debouncing for making the api hit as less as possible but with smooth userInterface
  const debouncing = function (fn, delay) {
    let timerID;
    return function () {
      let self = this;
      let args = arguments;
      if (timerID) {
        clearTimeout(timerID);
      }
      timerID = setTimeout(() => {
        fn.apply(self, args);
      }, delay);
    };
  };
  //using the callback hook beacuse for not to loose older debounceData reference
  const debounceData = useCallback(
    debouncing((value) => characterFinder(value), 300),
    []
  );
  //handlechange will used for setting the debounceData query by change in query in input
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value != "" || query != "") {
      setdropDownActive(false);
      debounceData(value);
    }
    if (value == "" || query == "") {
      setSuggestion([]);
      setdropDownActive(true);
    }
  };
  console.log(suggestion);
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
          onChange={handleChange}
        />
        {loading ? (
          <div className="loader">jj</div>
        ) : (
          <MdSearch className="search-icon" />
        )}
      </div>

      {dropDownActive ? null : (
        <div className="div-dropdown">
          {suggestion?.map((char, index) => (
            <Person
              name={char.name}
              gender={char.gender}
              year={char.birth_year}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
