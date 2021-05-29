import React from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

const PersonSuggest = ({ name, gender, year, onSelected, hightlight, url }) => {
  const history = useHistory();
  let arr = url.split("/");
  let id = arr[arr.length - 2];
  const handlePage = () => {
    history.push(`/person/${id}`);
  };
  return (
    <div
      className={`outer ${hightlight ? "activeBackground" : ""}`}
      onClick={handlePage}
    >
      <div className="Left">
        <h3>{name}</h3>
        <p>{year}</p>
      </div>
      <p className="Right">{gender}</p>
    </div>
  );
};

export { PersonSuggest };
