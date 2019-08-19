import React, { Component } from "react";
import "./FriendPost.scss";
import { connect } from "react-redux";
import ImageScroll from "../ImageScroll/ImageScroll";
import { likePost, unlikePost } from "../../redux/reducers/postReducer";
import { requestFriendsList } from "../../redux/reducers/userReducer";
import {
  Map as LeafletMap,
  FeatureGroup,
  GeoJSON,
  TileLayer
} from "react-leaflet";

class FriendPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentClass: "closed"
    };
  }
  onFeatureGroupAdd = e => {
    this.refs.friendMap.leafletElement.fitBounds(e.target.getBounds());
  };

  handleContentToggle = () => {
    let newClass = this.state.contentClass === "closed" ? "open" : "closed";
    this.setState({ contentClass: newClass });
  };

  render() {
    let countryBounds = this.props.geojson.features.filter(
      e => e.properties.name.toLowerCase() === this.props.post.country_name
    );
    return (
      <div className="profilePost">
        <div className="profilePostMain">
          <LeafletMap
            className="profileMap"
            ref="friendMap"
            center={[26.588527, 8.4375]}
            dragging={false}
            doubleClickZoom={false}
            zoomSnap={false}
            zoomDelta={false}
            trackResize={false}
            touchZoom={false}
            scrollWheelZoom={false}
            tap={false}
            zoom={1}
            zoomControl={false}
            minZoom={1}
            maxZoom={6}
            maxBoundsViscosity={1}
            maxBounds={[[90, 180], [-90, -180]]}
          >
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
            <FeatureGroup onAdd={this.onFeatureGroupAdd}>
              <GeoJSON
                data={countryBounds[0]}
                style={() => ({
                  stroke: true,
                  color: `${this.props.userColor}`,
                  weight: 4,
                  opacity: 0.05,
                  fillColor: `${this.props.userColor}`,
                  fillOpacity: 0.2
                })}
              />
            </FeatureGroup>
          </LeafletMap>
          <div id="profilePostContent">
            <h1>{countryBounds[0].properties.name}</h1>
            <h3>Visited on {this.props.post.upload_date}</h3>
            <button onClick={this.handleContentToggle}>
              Show {this.props.username}'s Post
            </button>
          </div>
        </div>
        <div id="profilePostContent" className={this.state.contentClass}>
          {this.props.post.image_urls.length > 0 && (
            <ImageScroll imgArr={this.props.post.image_urls} />
          )}
          <h5>Description</h5>
          <p>{this.props.post.post_content.split("!RECOMMENDATIONS!")[0]}</p>
          <h5>Recommendations</h5>
          <p>{this.props.post.post_content.split("!RECOMMENDATIONS!")[1]}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.user.posts,
    geojson: reduxState.map.geojson,
    userId: reduxState.auth.userId
  };
}

export default connect(
  mapStateToProps,
  { likePost, unlikePost, requestFriendsList }
)(FriendPost);
