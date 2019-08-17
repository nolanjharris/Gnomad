import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomPopup.scss";
import { Popup } from "react-leaflet";
import { connect } from "react-redux";
import {
  openPostForm,
  requestCountryPosts,
  openViewPosts
} from "../../redux/reducers/postReducer";

function CustomPopup(props) {
  const popup = React.createRef();
  const [countryInfo, setCountryInfo] = useState({
    nativeName: "",
    population: 0,
    languages: [],
    currencies: [],
    capital: "",
    flag: ""
  });

  useEffect(() => {
    let name = countryName(props.feature.properties.name);
    if (name) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(res => {
          setCountryInfo({
            nativeName: res.data[0].nativeName,
            population: res.data[0].population,
            languages: res.data[0].languages,
            currencies: res.data[0].currencies,
            capital: res.data[0].capital,
            flag: res.data[0].flag
          });
        })
        .catch(error => console.log(error));
    }
  }, [props]);

  const countryName = country => {
    switch (country) {
      case "Cape Verde":
        return "Cabo%20Verde";
      case "Siachen Glacier":
        return "";
      case "Faeroe Is.":
        return "Faroe";
      case "St. Vin. and Gren.":
        return "Saint%20Vincent%20and%20the%20Grenadines";
      case "W. Sahara":
        return "Sahara";
      case "Aland":
        return "Aland%20Islands";
      case "Fr. S. Antarctic Lands":
        return "";
      case "Dem. Rep. Congo":
        return "DR%20Congo";
      case "United Kingdom":
        return "united%20Kingdom";
      case "India":
        return "india?fullText=true";
      case "Br. Indian Ocean Ter.":
        return "indian%20ocean";
      case "Iran":
        return "islamic%20republic%20of%20iran";
      case "Korea":
        return "korea%20(republic%20of)?fullText=true";
      case "Dem. Rep. Korea":
        return "korea%20(democratic";
      case "Fr. Polynesia":
        return "polynesia";
      case "Saint Helena":
        return "helena";
      case "St. Pierre and Miquelon":
        return "miquelon";
      case "United States":
        return "united%20states%20of";
      case "U.S. Virgin Is.":
        return "american%20virgin";
      case "S. Geo. and S. Sandw. Is.":
        return "sandwich";
      case "S. Sudan":
        return "south%20sudan";
      case "N. Cyprus":
        return "cyprus";
      case "N. Mariana Is.":
        return "mariana";
      case "":
        return "";
      default:
        return country
          .split(".")
          .join("")
          .split(" ")[0];
    }
  };

  const handleAddToVisited = () => {
    props.openPostForm(props.feature);
    closePopupsOnClick();
  };

  const handlePostsByCountry = () => {
    let country = {
      nativeName: countryInfo.nativeName,
      population: countryInfo.population,
      languages: countryInfo.languages,
      currencies: countryInfo.currencies,
      capital: countryInfo.capital,
      flag: countryInfo.flag
    };
    props.requestCountryPosts(props.feature, country).then();
    closePopupsOnClick();
  };

  const closePopupsOnClick = () => {
    popup.current.leafletElement.options.leaflet.map.closePopup();
  };

  return (
    <Popup ref={popup}>
      <div id="customPopup">
        <img src={countryInfo.flag} alt="country flag" />
        <p>Welcome to {props.feature.properties.name}!</p>
        {props.feature.properties.name !== countryInfo.nativeName && (
          <p>{countryInfo.nativeName}</p>
        )}
        <div id="popupButtons">
          <button onClick={() => handleAddToVisited()}>
            Add to Visited List!
          </button>
          <button onClick={handlePostsByCountry}>View all posts</button>
        </div>
      </div>
    </Popup>
  );
}

export default connect(
  undefined,
  { openPostForm, openViewPosts, requestCountryPosts }
)(CustomPopup);
