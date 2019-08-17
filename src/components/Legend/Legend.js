import React, { Component } from "react";
import "./Legend.scss";
import { connect } from "react-redux";
import defaultProfilePic from "../../default_profile_photo.png";
import {
  sendFriendRequest,
  toggleFriend,
  updateFriendsColor,
  openFriendsProfile,
  toggleLegend
} from "../../redux/reducers/userReducer";
import { toggleFriendsCountries } from "../../redux/reducers/mapReducer";
import Switch from "react-switch";
import { CirclePicker } from "react-color";

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findTab: "closed",
      friendsTab: "open",
      users: [],
      color: "",
      friendColorId: 0,
      colorPicker: false,
      legendOpen: false,
      allFriends: false
    };
  }

  componentDidMount() {
    // this.props.toggleFriendsCountries();
  }

  handleToggleLegend = () => {
    // this.props.toggleFriendsCountries();
    this.props.toggleLegend();
    this.setState({ legendOpen: !this.state.legendOpen });
  };

  handleFindToggle = () => {
    let users = this.props.allUsers.filter(
      user => user.username !== this.props.username
    );
    users.filter(user =>
      this.props.sentFriendRequests.filter(
        sent => sent.username !== user.username
      )
    );
    this.setState({ findTab: "open", friendsTab: "closed", users });
  };

  handleFriendsToggle = () => {
    this.setState({ findTab: "closed", friendsTab: "open" });
  };

  handleToggleAllFriends = async () => {
    await this.props.toggleFriendsCountries();
    await this.props.friendsList.map(user => {
      return user.visible === !this.props.displayFriendsCountries
        ? this.props.toggleFriend(user.user_id)
        : user;
    });
    // this.setState({ allFriends: !this.state.allFriends });
  };

  handleUserSearch = e => {
    let users = this.props.allUsers.filter(
      user => user.username.toLowerCase() !== this.props.username.toLowerCase()
    );
    let foundUsers = users.filter(user =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ users: foundUsers });
  };

  handleSendFriendRequest = user => {
    this.props.sendFriendRequest(user.user_id);
  };

  handleToggleFriend = user => {
    this.props.toggleFriend(user.user_id);
  };

  handleToggleColorPicker = id => {
    this.setState({ colorPicker: !this.state.colorPicker, friendColorId: id });
  };

  handleChooseColor = color => {
    this.props.updateFriendsColor(this.state.friendColorId, color.hex);
    this.handleToggleColorPicker(this.state.friendColorId);
  };

  render() {
    return (
      <div id="mapLegend" className={this.state.legendOpen ? "show" : "hide"}>
        <div onClick={this.handleToggleLegend} id="legendSlideIcon">
          <i className="material-icons">people</i>
        </div>
        {this.state.colorPicker && (
          <CirclePicker
            color={this.state.color}
            onChangeComplete={this.handleChooseColor}
            width={window.innerWidth < 728 ? 210 : 254}
            circleSize={window.innerWidth < 728 ? 20 : 28}
          />
        )}
        <div id="legendTabs">
          <button
            onClick={this.handleFriendsToggle}
            className={this.state.friendsTab === "open" ? "focused" : null}
          >
            Friends
          </button>
          <button
            onClick={this.handleFindToggle}
            className={this.state.findTab === "open" ? "focused" : null}
          >
            Find
          </button>
        </div>
        <div id="legendContainer">
          <div id="legendFriendsTab" className={this.state.friendsTab}>
            {this.props.username && (
              <div>
                <div
                  id="currentUser"
                  className="legendFriend"
                  style={{
                    backgroundColor: `${
                      this.props.userColor ? this.props.userColor : "#0868a3"
                    }`
                  }}
                />
                <img
                  src={
                    this.props.profilePic
                      ? this.props.profilePic
                      : defaultProfilePic
                  }
                  alt="profile"
                />
                <p style={{ color: "rgb(35, 35, 35)" }}>
                  &{this.props.username}
                </p>
              </div>
            )}
            {this.props.friendsList.length > 0 && (
              <div id="toggleAllFriends">
                <Switch
                  onChange={this.handleToggleAllFriends}
                  checked={this.props.displayFriendsCountries}
                  height={15}
                  width={30}
                  className="react-switch"
                  handleDiameter={17}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                />
                <p>Show Friends</p>
              </div>
            )}
            {this.props.friendsList.map((friend, i) => {
              return (
                <div key={`legendFriend${i}`}>
                  <div
                    className="legendFriend"
                    style={{ backgroundColor: `${friend.friend_color}` }}
                  />
                  <div className="legendFriendInfo">
                    <Switch
                      onChange={() => this.handleToggleFriend(friend)}
                      checked={friend.visible}
                      height={15}
                      width={25}
                      className="react-switch"
                      handleDiameter={15}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      disabled={
                        this.props.displayFriendsCountries ? false : true
                      }
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    />
                    <p
                      onClick={() => {
                        this.props.openFriendsProfile(friend.user_id);
                        this.handleToggleLegend();
                      }}
                    >
                      &{friend.username}
                    </p>
                    <div className="colorSwatch">
                      <div className="color">
                        <i
                          onClick={() =>
                            this.handleToggleColorPicker(friend.user_id)
                          }
                          className="material-icons"
                          style={{ color: friend.countryColor }}
                        >
                          color_lens
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="legendFindTab" className={this.state.findTab}>
            <input
              onChange={this.handleUserSearch}
              placeholder="search by username"
              type="text"
            />
            {this.state.users.map((user, i) => {
              return (
                <div key={`legendUser${i}`} className="userSearch">
                  <p>&{user.username}</p>
                  {this.props.sentFriendRequests.findIndex(
                    e => e.username === user.username
                  ) < 0 ? (
                    <button onClick={() => this.handleSendFriendRequest(user)}>
                      Add Friend
                    </button>
                  ) : (
                    <button disabled>Pending</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    friendsList: reduxState.user.friendsList,
    allUsers: reduxState.user.allUsers,
    username: reduxState.auth.username,
    userColor: reduxState.auth.userColor,
    sentFriendRequests: reduxState.user.sentFriendRequests,
    profilePic: reduxState.auth.profilePic,
    displayFriendsCountries: reduxState.map.displayFriendsCountries
  };
}

export default connect(
  mapStateToProps,
  {
    sendFriendRequest,
    toggleFriend,
    toggleLegend,
    updateFriendsColor,
    openFriendsProfile,
    toggleFriendsCountries
  }
)(Legend);
