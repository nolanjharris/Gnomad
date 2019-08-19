import React, { Component } from "react";
import { connect } from "react-redux";
import ImageScroll from "../ImageScroll/ImageScroll";
import defaultProfilePic from "../../default_profile_photo.png";
import {
  closeViewPosts,
  deletePost,
  openEditPostForm,
  requestCountryPosts,
  likePost,
  unlikePost
} from "../../redux/reducers/postReducer";
import {
  Map as LeafletMap,
  FeatureGroup,
  GeoJSON,
  TileLayer
} from "react-leaflet";
import "./ViewPosts.scss";

class ViewPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false
    };
  }

  handleToggleDelete = () => {
    this.setState({ delete: !this.state.delete });
  };

  backToMap = () => {
    this.props.closeViewPosts();
  };

  onFeatureGroupAdd = e => {
    this.refs.countryMapView.leafletElement.fitBounds(e.target.getBounds());
  };

  handleLikePost = async post => {
    if (post.userLiked) {
      await this.props.unlikePost(post.post_id);
    } else {
      await this.props.likePost(post.post_id);
    }
    await this.props.requestCountryPosts(
      this.props.postCountry,
      this.props.countryInfo
    );
  };

  handleEdit = (id, country) => {
    this.props.openEditPostForm(id, country);
  };

  handleDelete = id => {
    this.props.deletePost(id);
  };

  render() {
    // let postCount = this.props.posts.length;
    return (
      <div id="viewPosts">
        <div id="viewPostsContainer">
          <i className="material-icons" id="close" onClick={this.backToMap}>
            close
          </i>
          <div id="viewPostsTitle">
            <LeafletMap
              id="countryMapView"
              ref="countryMapView"
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
              <TileLayer url="https://api.mapbox.com/styles/v1/nolanjames/cjyzw8gsf0v4t1coya5i7hm16/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5qYW1lcyIsImEiOiJjanlrdDdyaXYwMTc1M2NsaW1lbHk4OWJlIn0.iggyHj94yOeanu2cdVezug" />
              <FeatureGroup onAdd={this.onFeatureGroupAdd}>
                <GeoJSON
                  data={this.props.postCountry}
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
            <div>
              <h1>
                <img src={this.props.countryInfo.flag} alt="country flag" />
                {this.props.postCountry.properties.name}
              </h1>
              <div>
                {this.props.postCountry.properties.name.toLowerCase() !==
                  this.props.countryInfo.nativename && (
                  <h2>Native Name: {this.props.countryInfo.nativeName}</h2>
                )}
                <h3>
                  Languages:
                  {this.props.countryInfo.languages.map((e, i) => {
                    return this.props.countryInfo.languages.length - 1 === i ||
                      this.props.countryInfo.languages.length === 1
                      ? e.name
                      : e.name + ",";
                  })}
                </h3>
                <h3>
                  <strong>Population:</strong>{" "}
                  {this.props.countryInfo.population.toLocaleString()}
                </h3>
                <h3>Capital City: {this.props.countryInfo.capital}</h3>
                <h3>
                  Currency:{" "}
                  {this.props.countryInfo.currencies[0].symbol
                    ? `(${this.props.countryInfo.currencies[0].symbol})`
                    : null}
                  {this.props.countryInfo.currencies[0].name}
                </h3>
              </div>
            </div>
          </div>
          {this.props.posts.map((post, i) => {
            return (
              <div id="postContent" key={"post" + i}>
                <img
                  id="postProfilePic"
                  src={post.profile_pic ? post.profile_pic : defaultProfilePic}
                  alt="profile"
                />
                <h2>&{post.username}</h2>
                <h4>{post.upload_date}</h4>
                {post.image_urls.length > 0 && (
                  <div id="viewPostsImageScroll">
                    <ImageScroll imgArr={post.image_urls} />
                  </div>
                )}
                <div id="description">
                  <h3>Description:</h3>
                  <p>{post.post_content.split("!RECOMMENDATIONS!")[0]}</p>
                  <h3>Recommendations:</h3>
                  <p>{post.post_content.split("!RECOMMENDATIONS!")[1]}</p>
                </div>

                <div id="postIcons">
                  <div id="like">
                    <i
                      onClick={() => this.handleLikePost(post)}
                      className={`material-icons ${
                        post.userLiked ? "liked" : null
                      }`}
                    >
                      thumb_up
                    </i>
                    <p>{post.likes}</p>
                  </div>
                  {post.user_id === this.props.userId && (
                    <div id="editDelete">
                      <i
                        className="material-icons"
                        onClick={() => this.handleEdit(post)}
                      >
                        edit
                      </i>
                      <i
                        className="material-icons"
                        onClick={this.handleToggleDelete}
                      >
                        delete
                      </i>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    userId: reduxState.auth.userId,
    posts: reduxState.post.posts,
    postCountry: reduxState.post.postCountry,
    countryInfo: reduxState.post.postCountryInfo
  };
}

export default connect(
  mapStateToProps,
  {
    closeViewPosts,
    openEditPostForm,
    deletePost,
    requestCountryPosts,
    likePost,
    unlikePost
  }
)(ViewPosts);
