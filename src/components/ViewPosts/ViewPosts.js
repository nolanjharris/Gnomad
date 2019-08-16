import React, { Component } from "react";
import { connect } from "react-redux";
import ImageScroll from "../ImageScroll/ImageScroll";
import defaultProfilePic from "../../default_profile_photo.png";
import {
  closeViewPosts,
  deletePost,
  openEditPostForm,
  requestCountryPosts
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

  handleEdit = (id, country) => {
    this.props.openEditPostForm(id, country);
    console.log(country);
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
              zoom={3}
              zoomControl={false}
              minZoom={3}
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
              <h1>{this.props.postCountry.properties.name}</h1>
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
                  <ImageScroll imgArr={post.image_urls} />
                )}
                <div id="description">
                  <h3>Description:</h3>
                  <p>{post.post_content.split("!RECOMMENDATIONS!")[0]}</p>
                  <h3>Recommendations:</h3>
                  <p>{post.post_content.split("!RECOMMENDATIONS!")[1]}</p>
                </div>
                {post.user_id === this.props.userId && (
                  <div id="editDelete">
                    <i
                      className="material-icons"
                      onClick={() =>
                        this.handleEdit(post.post_id, this.props.postCountry)
                      }
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
    postCountry: reduxState.post.postCountry
  };
}

export default connect(
  mapStateToProps,
  { closeViewPosts, openEditPostForm, deletePost, requestCountryPosts }
)(ViewPosts);
