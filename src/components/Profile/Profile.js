import React, { Component } from "react";
import "./Profile.scss";
import defaultProfilePic from "../../default_profile_photo.png";
import { connect } from "react-redux";
import { closeProfile } from "../../redux/reducers/userReducer";
import {
  updateProfilePic,
  updateUserColor
} from "../../redux/reducers/authReducer";
import ProfilePost from "../ProfilePost/ProfilePost";
import { CirclePicker } from "react-color";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInfo: [],
      visitedList: [],
      showPosts: false,
      showImages: false,
      colorPicker: false,
      images: []
    };
  }

  componentDidMount() {
    this.setState({
      countryInfo: this.props.visitedListGeojson,
      visitedList: this.props.visitedList,
      colorPicker: false
    });
  }

  findCurrentPost = country => {
    let countryId = this.props.visitedList.filter(e => e.country_name);
    let result = this.props.posts.filter(
      e => e.country_id === countryId.country_id
    );
    return result;
  };

  checkUploadResult = (error, resultEvent) => {
    if (resultEvent.event === "success") {
      this.props.updateProfilePic(resultEvent.info.secure_url);
    }
  };

  handleShowPosts = () => {
    this.setState({
      showPosts: !this.state.showPosts,
      showImages: false,
      colorPicker: false
    });
  };

  handleShowImages = () => {
    let images = [];
    this.props.posts.map(e => {
      return e.image_urls.map(i => images.push(i));
    });
    this.setState({
      images,
      showImages: !this.state.showImages,
      showPosts: false,
      colorPicker: false
    });
  };

  handleToggleColorPicker = () => {
    this.setState({
      colorPicker: !this.state.colorPicker,
      showPosts: false,
      showImages: false
    });
  };

  handleChooseColor = color => {
    this.props.updateUserColor(color.hex);
  };

  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dytja9xnd",
        uploadPreset: "profilePictures",
        sources: ["local", "url", "dropbox", "facebook", "instagram"]
      },
      (error, result) => {
        this.checkUploadResult(error, result);
      }
    );
    let countryCount = this.props.visitedList.length;
    return (
      <div id="profile">
        <div id="profileContainer">
          <i className="material-icons" onClick={this.props.closeProfile}>
            close
          </i>
          <div id="profileTitle">
            <div
              id="profilePic"
              style={{ backgroundColor: this.props.userColor }}
            >
              <img
                src={
                  this.props.profilePic
                    ? this.props.profilePic
                    : defaultProfilePic
                }
                alt="profile face"
              />
            </div>
            <div id="profileContent">
              <h1>
                {this.props.firstName} {this.props.lastName}
              </h1>
              <h3>&{this.props.username}</h3>
              <h4>You have visited {countryCount} countries!</h4>
              <button onClick={() => widget.open()}>
                Update Profile Picture
              </button>
              <button onClick={this.handleToggleColorPicker}>
                Update Visited-Country Color
              </button>
              {this.state.colorPicker && (
                <div id="colorPicker">
                  <CirclePicker onChangeComplete={this.handleChooseColor} />
                </div>
              )}
              <button id="visitedList" onClick={this.handleShowPosts}>
                {this.state.showPosts ? "Hide" : "Show"} Visited List
              </button>
              <button id="visitedList" onClick={this.handleShowImages}>
                {this.state.showImages ? "Hide" : "Show"} Your Photos
              </button>
            </div>
          </div>
          <div id="profileInfo">
            {this.state.showPosts &&
              this.state.countryInfo.length > 0 &&
              this.state.countryInfo.map((country, i) => {
                return <ProfilePost key={i} country={country} />;
              })}
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
    username: reduxState.auth.username,
    firstName: reduxState.auth.firstName,
    lastName: reduxState.auth.lastName,
    profilePic: reduxState.auth.profilePic,
    userColor: reduxState.auth.userColor,
    posts: reduxState.user.posts,
    visitedList: reduxState.user.visitedList,
    visitedListGeojson: reduxState.map.visitedListGeojson
  };
}

export default connect(
  mapStateToProps,
  { closeProfile, updateProfilePic, updateUserColor }
)(Profile);
