/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import logo from "../../logo.png";
import defaultProfilePic from "../../default_profile_photo.png";
import continents from "../../continents";
import "./Sidebar.scss";
import { logoutUser } from "../../redux/reducers/authReducer";
import { resetPost } from "../../redux/reducers/postReducer";
import {
  resetUser,
  openProfile,
  requestUserPosts,
  requestFriendsList,
  sendFriendRequest,
  acceptFriendRequest,
  toggleLegend,
  requestAllUsers
} from "../../redux/reducers/userReducer";
import {
  searchMap,
  updateBounds,
  exitSearch,
  updateVisitedGeojson,
  toggleFriendsCountries,
  resetMap
} from "../../redux/reducers/mapReducer";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      displayClass: "closed",
      searchResults: [],
      searchValue: "",
      continent: "",
      usernameSearch: "",
      usernameResults: [],
      notificationsDisplay: "closed"
    };
  }

  getFriendsList = async () => {
    // await this.props.requestFriendsList(this.props.userId);
    this.props.toggleFriendsCountries();
    this.props.toggleLegend();
    this.setState({ menuOpen: false, displayClass: "closed" });
  };
  handleLogout = async () => {
    this.setState({ notificationsDisplay: "closed" });
    await this.props.logoutUser();
    this.props.resetPost();
    this.props.resetUser();
    this.props.resetMap();
    await this.props.requestAllUsers();
  };

  handleSearch = e => {
    let results = this.props.geojson.features.filter(country =>
      country.properties.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    console.log();
    this.setState({ searchResults: results, searchValue: e.target.value });
    this.props.exitSearch();
  };

  handleSearchedCountry = country => {
    this.props.searchMap();
    this.props.updateBounds(country);
    this.handleSlideToggle();
    this.setState({ searchResults: [], searchValue: "" });
    setTimeout(() => {
      this.props.exitSearch();
    }, 200);
  };

  handleClearSearch = () => {
    this.props.exitSearch();
    this.props.updateBounds(continents.features[6]);
    this.setState({ continent: "" });
  };

  handleSearchedContinent = e => {
    this.setState({ continent: e.target.value });
    this.handleSlideToggle();
    // this.props.exitSearch();
    let foundContinent = continents.features.filter(
      continent => continent.properties.name === e.target.value
    );
    console.log(foundContinent);
    this.props.searchMap();
    this.props.updateBounds(foundContinent[0]);
    // this.props.updateBounds(continents.features[6]);
  };

  handleEarthView = async () => {
    this.props.searchMap();
    this.setState({
      menuOpen: false,
      displayClass: "closed",
      notificationsDisplay: "closed"
    });
    await this.props.updateBounds(continents.features[6]);
    this.props.exitSearch();
  };

  handleUsernameSearch = e => {
    let foundUser = this.props.allUsers.filter(user =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ usernameResults: foundUser, username: e.target.value });
    console.log(foundUser);
  };

  handleAddFriend = async user => {
    console.log(user.user_id);
    await sendFriendRequest(user.user_id);
  };

  handleAcceptFriendRequest = async user => {
    await this.props
      .acceptFriendRequest(user.user_id)
      .then(res => console.log(user.user_id));
  };

  handleProfileOpen = () => {
    this.props.requestUserPosts(this.props.userId);
    this.props.updateVisitedGeojson(this.props.visitedList);
    this.props.openProfile();
  };

  handleSlideToggle = () => {
    let display = this.state.displayClass === "closed" ? "open" : "closed";
    this.setState({
      menuOpen: !this.state.menuOpen,
      displayClass: display,
      notificationsDisplay: "closed"
    });
  };

  handleNotifications = () => {
    let display =
      this.state.notificationsDisplay === "closed" ? "open" : "closed";
    this.setState({ notificationsDisplay: display });
  };

  render() {
    if (this.props.friendsList > 0) {
      let unfriended = this.props.allUsers.filter(
        e =>
          this.props.friendsList.findIndex(a => a.username === e.username) < 0
      );
      console.log(unfriended);
    }

    return (
      <div className="sidebar">
        <div id="sideBarTitle" onClick={this.handleSlideToggle}>
          <h1>
            <span className={this.state.displayClass}>GN</span>
            <img src={logo} alt="gnomad" />
            <span className={this.state.displayClass}>MAD</span>
          </h1>
          <Icon
            id="menuIcon"
            color="action"
            onClick={this.handleSlideToggle}
            style={{ float: "left", fontSize: "3em" }}
          >
            menu
          </Icon>
          {this.props.loggedIn &&
            (this.props.friendsList.length === 0
              ? this.props.requestFriendsList(this.props.userId)
              : true) && (
              <div className={this.state.displayClass} id="profileInfo">
                <div
                  id="profilePicDiv"
                  style={{ backgroundColor: this.props.userColor }}
                >
                  <img
                    src={
                      this.props.profilePic
                        ? this.props.profilePic
                        : defaultProfilePic
                    }
                    alt="profile"
                  />
                </div>
                <h4>&{this.props.username}</h4>
                <button id="openProfile" onClick={this.handleProfileOpen}>
                  Profile
                </button>
                <button onClick={this.handleLogout}>Logout</button>
              </div>
            )}
        </div>

        <div className="menuItems">
          <div className={`iconDiv ${this.props.loggedIn ? null : "closed"}`}>
            <div className="iconContainer notifications">
              <div id="notificationsIcon">
                {this.props.pendingFriendRequests.length > 0 && (
                  <div id="notify" />
                )}
                <i
                  onClick={this.handleSlideToggle}
                  color="action"
                  className="material-icons"
                  style={{ fontSize: "1.5em" }}
                >
                  notifications
                </i>
              </div>
              {this.state.notificationsDisplay === "open" ? (
                <button
                  onClick={this.handleNotifications}
                  className={this.state.displayClass}
                >
                  Notifications
                  <i className="material-icons">arrow_drop_up</i>
                </button>
              ) : (
                <button
                  onClick={this.handleNotifications}
                  className={this.state.displayClass}
                >
                  Notifications
                  <i className="material-icons">arrow_drop_down</i>
                </button>
              )}
            </div>
          </div>
          {this.state.notificationsDisplay === "open" && (
            <div id="notificationsPanel">
              <div className={this.state.notificationsDisplay}>
                <h1>Friend Requests</h1>
                {this.props.pendingFriendRequests.length > 0 &&
                  this.props.pendingFriendRequests.map(e => {
                    return (
                      <div>
                        <p>&{e.username}</p>
                        <button
                          onClick={() => this.handleAcceptFriendRequest(e)}
                        >
                          Accept Request
                        </button>
                      </div>
                    );
                  })}
                {this.props.pendingFriendRequests.length === 0 && (
                  <h2>No new requests</h2>
                )}
              </div>
            </div>
          )}
          <div className="iconDiv" id="searchIconDiv">
            <i
              onClick={this.handleSlideToggle}
              color="disabled"
              className="material-icons"
              style={{ fontSize: "1.5em" }}
            >
              search
            </i>
            <div id="searchIconDiv">
              <input
                onChange={this.handleSearch}
                placeholder="Country Search"
                value={this.state.searchValue}
                className={`${this.state.displayClass} ${
                  this.state.notificationsDisplay === "closed"
                    ? "open"
                    : "closed"
                }`}
                type="text"
              />
              {this.state.searchValue && this.state.searchResults.length > 0 && (
                <div id="countrySearchResults">
                  {this.state.searchResults.map((e, i) => {
                    return (
                      <p onClick={() => this.handleSearchedCountry(e)} key={i}>
                        {e.properties.name}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="iconDiv">
            <div className="iconContianer">
              <i
                onClick={this.handleSlideToggle}
                className="material-icons"
                color="action"
                style={{ fontSize: "1.5em" }}
              >
                explore
              </i>
            </div>
            <select
              onClick={this.handleClearSearch}
              onChange={this.handleSearchedContinent}
              value={this.state.continent}
              className={`${this.state.displayClass} ${
                this.state.notificationsDisplay === "closed" ? "open" : "closed"
              }`}
            >
              <option value="" disabled>
                Continent View
              </option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Europe">Europe</option>
              <option value="N. America">N. America</option>
              <option value="S. America">S. America</option>
            </select>
          </div>
          <div className="iconDiv">
            <div className="iconContianer">
              <i
                onClick={this.handleEarthView}
                color="action"
                className="material-icons"
                style={{ fontSize: "1.5em" }}
              >
                public
              </i>
            </div>
            <button
              onClick={this.handleEarthView}
              className={`${this.state.displayClass} ${
                this.state.notificationsDisplay === "closed" ? "open" : "closed"
              }`}
            >
              World View
            </button>
          </div>
          <div className={`iconDiv ${this.props.loggedIn ? null : "closed"}`}>
            <i
              onClick={this.getFriendsList}
              color="action"
              className="material-icons"
              style={{ fontSize: "1.5em" }}
            >
              people
            </i>
            <button
              onClick={this.getFriendsList}
              className={`${this.state.displayClass} ${
                this.state.notificationsDisplay === "closed" ? "open" : "closed"
              }`}
            >
              Toggle Friends
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    loggedIn: reduxState.auth.loggedIn,
    username: reduxState.auth.username,
    userId: reduxState.auth.userId,
    geojson: reduxState.map.geojson,
    visitedList: reduxState.user.visitedList,
    allUsers: reduxState.user.allUsers,
    friendsList: reduxState.user.friendsList,
    pendingFriendRequests: reduxState.user.pendingFriendRequests,
    sentFriendRequests: reduxState.user.sentFriendRequests,
    profilePic: reduxState.auth.profilePic,
    userColor: reduxState.auth.userColor
  };
}

export default connect(
  mapStateToProps,
  {
    openProfile,
    sendFriendRequest,
    acceptFriendRequest,
    toggleFriendsCountries,
    requestUserPosts,
    updateVisitedGeojson,
    logoutUser,
    updateBounds,
    searchMap,
    exitSearch,
    resetPost,
    resetUser,
    resetMap,
    requestFriendsList,
    toggleLegend,
    requestAllUsers
  }
)(Sidebar);
