import React from "react";
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
  const handleAddToVisited = () => {
    props.openPostForm(props.feature);
    closePopusOnClick();
  };

  const handlePostsByCountry = () => {
    props.requestCountryPosts(props.feature).then();
    props.closePopup();
  };

  const closePopusOnClick = () => {
    popup.current.leafletElement.options.leaflet.map.closePopup();
  };

  return (
    <Popup ref={popup}>
      <div id="customPopup">
        <p>Welcome to {props.feature.properties.name}!</p>
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
