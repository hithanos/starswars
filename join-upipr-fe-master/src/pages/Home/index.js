import React, { useState, useCallback, useRef } from "react";
import logo from "./star-wars-logo.png";
import { MdSearch } from "react-icons/md";
import { PersonSuggest } from "../PersonSuggest/PersonSuggest";
import axios from "axios";
import "./index.css";
import { useHistory } from "react-router-dom";

function HomePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [Hide, setHide] = useState(true);
  const [suggestion, setSuggestion] = useState([]);
  const [cursor, setCursor] = React.useState(-1);
  const serachContainer = useRef(null);
  const history = useHistory();
  //calling the get method with axios
  function characterFinder(value) {
    setLoading(true);
    if (value) {
      axios
        .get(`https://swapi.dev/api/people/?search=${value}`)
        .then((res) => {
          setSuggestion(res.data.results);
          setHide(false);
        })
        .catch((err) => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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
      setHide(false);
      debounceData(value);
    }
    if (value === "" || query === "" || suggestion.length == 0) {
      setSuggestion([]);
      setHide(true);
    }
  };
  console.log(query);
  const KeyBoardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      if (!Hide) {
        setCursor((c) => (c < suggestion.length - 1 ? c + 1 : c));
      }
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c >= 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      setHide(true);
    }
    if (e.key === "Enter" && cursor >= 0) {
      let arr = suggestion[cursor].url.split("/");
      let id = arr[arr.length - 2];
      history.push({
        pathname: `/person/${id}`,
      });
    }
  };
  const handleClearInput = () => {
    setQuery("");
    setSuggestion([]);
    setLoading(false);
    setHide(true);
  };
  console.log(suggestion);
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="div-input" ref={serachContainer}>
        <input
          className="search-input"
          placeholder="Search by name"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => KeyBoardNavigation(e)}
        />
        {query.length > 0 ? (
          <div className="clear">
            <div onClick={handleClearInput}>X</div>
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div className="loader1"></div>
        ) : (
          <MdSearch className="search-icon" />
        )}
      </div>

      {Hide ? null : (
        <div className="div-dropdown">
          {suggestion?.map((char, index) => (
            <PersonSuggest
              name={char.name}
              gender={char.gender}
              year={char.birth_year}
              key={index}
              url={char.url}
              onSelected={() => {
                setQuery(char.name);
              }}
              hightlight={cursor == index ? true : false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
