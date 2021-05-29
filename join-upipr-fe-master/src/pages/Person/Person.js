import React from "react";
import "./index.css";

const Person = ({ name, gender, year }) => {
  return (
    <div className="outer">
      <div className="dropDownContentLeft">
        <h3>{name}</h3>
        <p>{year}</p>
      </div>
      <p className="dropDownContentRight">{gender}</p>
    </div>
  );
};

export { Person };
