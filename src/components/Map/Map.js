import React, { Component } from "react";
import { connect } from "react-redux";
import { openPostForm } from "../../redux/reducers/postReducer";
import {
  requestVisitedList,
  requestFriendsList,
  requestAllUsers
} from "../../redux/reducers/userReducer";
import "./Map.scss";
import {
  Map as LeafletMap,
  FeatureGroup,
  ZoomControl,
  GeoJSON,
  TileLayer
} from "react-leaflet";
import worldGeoJSON from "geojson-world-map";
import CustomPopup from "../CustomPopup/CustomPopup";
import { updateGeojson } from "../../redux/reducers/mapReducer";
import FriendsMap from "../FriendsMap/FriendsMap";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedList: []
    };
  }

  componentDidMount() {
    this.setState({ visitedList: this.props.visitedList });
    this.props.updateGeojson(worldGeoJSON);
    this.props.requestAllUsers();
  }

  onFeatureGroupAdd = e => {
    this.refs.map.leafletElement.fitBounds(e.target.getBounds());
  };

  render() {
    if (this.props.userId && !this.props.requested) {
      this.props.requestVisitedList(this.props.userId);
      //     setTimeout(() => {
      //         this.props.requestFriendsList(this.props.userId);
      //     }, 100);
    }
    let visited = [];
    this.props.visitedList.map(e => visited.push(e.country_name));
    let continents = [
      "Earth",
      "Africa",
      "Asia",
      "Australia",
      "N. America",
      "S. America",
      "Europe"
    ];
    let zoom = 2;
    if (window.innerWidth > 1200 || window.innerWidth < 500) {
      zoom = 3;
    }
    return (
      <div>
        <LeafletMap
          id="map"
          ref="map"
          center={[23.725012, 15.644531]}
          zoom={zoom}
          zoomControl={false}
          minZoom={zoom}
          LatLng="wrap"
          maxZoom={7}
          maxBoundsViscosity={1}
          maxBounds={[[90, 180], [-90, -180]]}
        >
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" />

          <FeatureGroup>
            {this.props.geojson.features &&
              this.props.geojson.features.map((feature, i) => {
                const countryName = feature.properties.name.toLowerCase();
                return visited.includes(countryName) ? (
                  <GeoJSON
                    key={i}
                    ref="geojson"
                    data={feature}
                    style={() => ({
                      stroke: true,
                      color: `${
                        this.props.userColor ? this.props.userColor : "#0868a3"
                      }`,
                      weight: 4,
                      opacity: 0.1,
                      fillColor: `${this.props.userColor}`,
                      fillOpacity: 0.3
                    })}
                  >
                    <CustomPopup feature={feature} />
                  </GeoJSON>
                ) : (
                  <GeoJSON
                    key={i}
                    data={feature}
                    style={() => ({
                      stroke: false,
                      color: "#4a83ec",
                      weight: 0.5,
                      fillColor: "#1a1d62",
                      fillOpacity: 0
                    })}
                  >
                    <CustomPopup feature={feature} />
                  </GeoJSON>
                );
              })}
          </FeatureGroup>
          {this.props.geojson.features && this.props.displayFriendsCountries && (
            <FeatureGroup>
              {this.props.geojson.features.map((feature, i) => {
                return <FriendsMap key={i} feature={feature} />;
              })}
            </FeatureGroup>
          )}
          {this.props.searchMap && (
            <FeatureGroup onAdd={this.onFeatureGroupAdd}>
              <GeoJSON
                data={this.props.bounds}
                style={() => ({
                  stroke: false,
                  color: "#4a83ec",
                  weight: 0.5,
                  fillColor: "#1a1d62",
                  fillOpacity: continents.includes(
                    this.props.bounds.properties.name
                  )
                    ? 0
                    : 0.1
                })}
              >
                {continents.includes(this.props.bounds.properties.name) && (
                  <CustomPopup feature={this.props.bounds} />
                )}
              </GeoJSON>
            </FeatureGroup>
          )}
          <ZoomControl position="topright" />
        </LeafletMap>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    userId: reduxState.auth.userId,
    visitedList: reduxState.user.visitedList,
    requested: reduxState.user.requested,
    bounds: reduxState.map.bounds,
    geojson: reduxState.map.geojson,
    searchMap: reduxState.map.searchMap,
    displayFriendsCountries: reduxState.map.displayFriendsCountries,
    friendsList: reduxState.user.friendsList,
    userColor: reduxState.auth.userColor
  };
}

export default connect(
  mapStateToProps,
  {
    updateGeojson,
    requestAllUsers,
    requestFriendsList,
    openPostForm,
    requestVisitedList
  }
)(Map);
