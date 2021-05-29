import React from "react";
import "./index.css";

const Person = ({ name, gender, year, onSelected, hightlight }) => {
  return (
    <div
      className={`outer ${hightlight ? "activeBackground" : ""}`}
      onClick={onSelected}
    >
      <div className="dropDownContentLeft">
        <h3>{name}</h3>
        <p>{year}</p>
      </div>
      <p className="dropDownContentRight">{gender}</p>
    </div>
  );
};

export { Person };
