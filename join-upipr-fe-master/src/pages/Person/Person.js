import React from "react";
import "./index.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
const Person = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const { id } = useParams();
  const history = useHistory();
  const getData = () => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getData();
  }, []);
  const handleBack = () => {
    history.push("/");
  };

  return (
    <div className="container-outer">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="container-backButton">
            <MdArrowBack className="backArrow" onClick={handleBack} />
          </div>
          <div className="container--info">
            <p>{data.name}</p>
            <p>{data.birth_year}</p>
            <p>{data.gender}</p>
          </div>
        </>
      )}
    </div>
  );
};

export { Person };
