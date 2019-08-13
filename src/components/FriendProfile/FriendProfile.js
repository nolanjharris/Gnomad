import React, { Component } from "react";
import "./FriendProfile.scss";
import { connect } from "react-redux";
import defaultProfilePic from "../../default_profile_photo.png";
import FriendPost from "../FriendPost/FriendPost";
import {
  closeFriendsProfile,
  updateFriendsColor
} from "../../redux/reducers/userReducer";
import { CirclePicker } from "react-color";

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: false,
      showImages: false,
      images: [],
      colorPicker: false
    };
  }

  onFeatureGroupAdd = e => {
    this.refs.friendMap.leafletElement.fitBounds(e.target.getBounds());
  };

  handleTogglePosts = () => {
    this.setState({
      posts: !this.state.posts,
      showImages: false,
      colorPicker: false
    });
  };

  handleToggleColorPicker = () => {
    this.setState({ colorPicker: !this.state.colorPicker });
  };

  handleToggleImages = () => {
    let images = [];
    this.props.friendProfileInfo[0].posts.map(e => {
      return e.image_urls.map(i => images.push(i));
    });
    this.setState({
      images,
      showImages: !this.state.showImages,
      colorPicker: false,
      posts: false
    });
    console.log(images);
  };

  handleChooseColor = color => {
    this.props.updateFriendsColor(
      this.props.friendProfileInfo[0].user_id,
      color.hex
    );
  };

  render() {
    const {
      profile_pic,
      first_name,
      last_name,
      username,
      posts,
      visitedList,
      user_id
    } = this.props.friendProfileInfo[0];
    let friendIndex = this.props.friendsList.findIndex(
      e => e.user_id === user_id
    );
    const countryCount = visitedList.length;
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
              style={{
                backgroundColor: `${
                  this.props.friendsList[friendIndex].friend_color
                }`
              }}
            >
              {profile_pic ? (
                <img src={profile_pic} alt="friend profile" />
              ) : (
                <img src={defaultProfilePic} alt="" />
              )}
            </div>
            <div id="friendProfileContent">
              <h1>
                {first_name} {last_name}
              </h1>
              <h3>&{username}</h3>

              <h4>
                {username} has visited {countryCount}{" "}
                {countryCount === 1 ? "countries" : "country"}!
              </h4>
              <button onClick={this.handleToggleColorPicker}>
                Update Visited-Country Color
              </button>
              {this.state.colorPicker && (
                <div id="colorPicker">
                  <CirclePicker onChangeComplete={this.handleChooseColor} />
                </div>
              )}
              <button className="visitedList" onClick={this.handleTogglePosts}>
                View Visited List
              </button>
              <button className="visitedList" onClick={this.handleToggleImages}>
                Show All Photos
              </button>
            </div>
          </div>
          <div id="friendProfileInfo">
            {this.state.posts && (
              <div id="friendProfilePost">
                {posts.map((post, i) => {
                  return (
                    <div key={`friendsPost${i}`} className="friendPost">
                      <FriendPost
                        username={username}
                        userColor={
                          this.props.friendsList[friendIndex].friend_color
                        }
                        post={post}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {this.state.showImages && (
              <div id="profileImages">
                {this.state.images.map((image, i) => {
                  return <img src={image} key={`travels${i}`} alt="travels" />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    friendProfileInfo: reduxState.user.friendProfileInfo,
    geojson: reduxState.map.geojson,
    friendsList: reduxState.user.friendsList
  };
}

export default connect(
  mapStateToProps,
  { closeFriendsProfile, updateFriendsColor }
)(FriendProfile);
