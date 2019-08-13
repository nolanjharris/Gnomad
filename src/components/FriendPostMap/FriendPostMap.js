import React, { Component } from "react";
import "./FriendPostMap.scss";
import { connect } from "react-redux";
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

  render() {
    let countryBounds = this.props.geojson.features.filter(
      e => e.properties.name.toLowerCase() === this.props.post.country_name
    );
    return (
      <LeafletMap
        id="friendMap"
        ref="friendMap"
        center={[26.588527, 8.4375]}
        zoom={4}
        zoomControl={false}
        minZoom={0}
        maxBoundsViscosity={1}
        maxBounds={[[90, 180], [-90, -180]]}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        />
        <FeatureGroup onAdd={this.onFeatureGroupAdd}>
          <GeoJSON
            data={countryBounds}
            style={() => ({
              stroke: true,
              color: "#4a83ec",
              weight: 4,
              opacity: 0.05,
              fillColor: "#4a83ec",
              fillOpacity: 0.2
            })}
          />
        </FeatureGroup>
      </LeafletMap>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.user.posts,
    geojson: reduxState.map.geojson
  };
}

export default connect(mapStateToProps)(FriendPost);
