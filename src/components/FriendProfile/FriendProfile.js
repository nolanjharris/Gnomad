import React, { Component } from "react";
import "./FriendProfile.scss";
import { connect } from "react-redux";
import defaultProfilePic from "../../default_profile_photo.png";
import FriendPostMap from "../FriendPostMap/FriendPostMap";
import { closeFriendsProfile } from "../../redux/reducers/userReducer";
import ImageScroll from "../ImageScroll/ImageScroll";

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: false,
      images: false
    };
  }

  onFeatureGroupAdd = e => {
    this.refs.friendMap.leafletElement.fitBounds(e.target.getBounds());
  };

  handleTogglePosts = () => {
    this.setState({ posts: !this.state.posts });
  };

  handleToggleImages = () => {
    this.setState({ images: !this.state.images });
  };

  render() {
    const {
      profile_pic,
      first_name,
      last_name,
      username,
      posts,
      visitedList,
      friend_color
    } = this.props.friendProfileInfo[0];
    const countryCount = visitedList.length;
    let images = [];
    posts.map(post => (images = [...images, posts.image_urls]));
    return (
      <div id="friendProfile">
        <div id="friendProfileContainer">
          <i
            onClick={this.props.closeFriendsProfile}
            className="material-icons"
            id="closeProfile"
          >
            close
          </i>
          <div id="friendProfileTitle">
            <div
              id="friendProfilePic"
              style={{ backgroundColor: `${friend_color}` }}
            >
              {profile_pic ? (
                <img src={profile_pic} alt="friend profile" />
              ) : (
                <img src={defaultProfilePic} alt="" />
              )}
            </div>
            <h1>
              {first_name} {last_name}
            </h1>
            <h3>&{username}</h3>
          </div>
          <div>
            <h5>Visited a total of {countryCount} countries</h5>
            <button>View Visited List</button>
            <button onClick={this.handleTogglePosts}>View Posts</button>
            <button onClick={this.handleToggleImages}>Show All Photos</button>
          </div>
          {this.state.posts && (
            <div id="friendProfilePost">
              {posts.map(post => {
                return (
                  <div className="friendPost">
                    <FriendPostMap post={post} />
                    <h2>{post.country_name}</h2>
                    <h3>{post.upload_date}</h3>
                    {post.image_urls.length > 0 && (
                      <ImageScroll imgArr={post.image_urls} />
                    )}
                    <p>{post.post_content.split("!RECOMMENDATIONS!")[0]}</p>
                    <p>{post.post_content.split("!RECOMMENDATIONS!")[1]}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    friendProfileInfo: reduxState.user.friendProfileInfo,
    geojson: reduxState.map.geojson
  };
}

export default connect(
  mapStateToProps,
  { closeFriendsProfile }
)(FriendProfile);
