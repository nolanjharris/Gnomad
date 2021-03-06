import React, { Component } from "react";
import "./ProfilePost.scss";
import ImageScroll from "../ImageScroll/ImageScroll";
import {
  removeUserCountry,
  closeProfile
} from "../../redux/reducers/userReducer";
import {
  openEditPostForm,
  editProfilePost
} from "../../redux/reducers/postReducer";
import { connect } from "react-redux";
import {
  Map as LeafletMap,
  FeatureGroup,
  GeoJSON,
  TileLayer
} from "react-leaflet";

class ProfilePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentClass: "closed"
    };
  }
  onFeatureGroupAdd = e => {
    this.refs.profileMap.leafletElement.fitBounds(e.target.getBounds());
  };

  handleContentToggle = () => {
    let newClass = this.state.contentClass === "closed" ? "open" : "closed";
    this.setState({ contentClass: newClass });
  };

  handleRemoveCountry = country => {
    this.props.removeUserCountry(country);
    this.props.closeProfile();
  };

  handleEdit = async (post, country) => {
    await this.props.editProfilePost(post);
    this.props.openEditPostForm(post[0].post_id, country);
    this.props.closeProfile();
  };

  render() {
    let post = this.props.posts.filter(
      e => e.country_name === this.props.country.properties.name.toLowerCase()
    );
    return (
      <div className="profilePost">
        <div className="profilePostMain">
          <LeafletMap
            className="profileMap"
            ref="profileMap"
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
                data={this.props.country}
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
            <h1>{this.props.country.properties.name}</h1>
            <h3>Visited on {post[0] ? post[0].upload_date : null}</h3>
            <button onClick={this.handleContentToggle}>Show Your Post</button>
            <button
              onClick={() =>
                this.handleRemoveCountry(
                  this.props.country.properties.name.toLowerCase()
                )
              }
            >
              Remove Country From Your List
            </button>
          </div>
        </div>
        <div id="profilePostContent" className={this.state.contentClass}>
          {post[0] && post[0].image_urls.length > 0 && (
            <ImageScroll imgArr={post[0].image_urls} />
          )}
          <h5>Description</h5>
          <p>{post[0] && post[0].post_content.split("!RECOMMENDATIONS!")[0]}</p>
          <h5>Recommendations</h5>
          <p>{post[0] && post[0].post_content.split("!RECOMMENDATIONS!")[1]}</p>
          <div id="editDelete">
            <i
              className="material-icons"
              onClick={() => this.handleEdit(post, this.props.country)}
            >
              edit
            </i>
            <i className="material-icons">delete</i>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.user.posts,
    userColor: reduxState.auth.userColor
  };
}

export default connect(
  mapStateToProps,
  { removeUserCountry, closeProfile, openEditPostForm, editProfilePost }
)(ProfilePost);
