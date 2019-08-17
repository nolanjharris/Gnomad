/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../logo.png";
import "./LoginRegisterPopup.scss";
import { loginUser, registerUser } from "../../redux/reducers/authReducer";
import {
  requestVisitedList,
  requestUserPosts,
  requestFriendsList
} from "../../redux/reducers/userReducer";

class LoginRegisterPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      register: true
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegisterToggle = () => {
    this.setState({ register: !this.state.register });
  };

  handleLogin = async () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    await this.props.loginUser(user);
  };

  handleRegister = () => {
    const { firstName, lastName, username, password } = this.state;
    const user = {
      firstName,
      lastName,
      username,
      password,
      userColor: "#0868a3"
    };
    this.props.registerUser(user);
  };

  render() {
    return (
      <div id="login-register-background-div">
        <div id="login-register-popup-content">
          <div id="login-title-div">
            <h2>
              GN
              <img src={logo} alt="gnomad logo" />
              MAD
            </h2>
            <div>
              <p>
                {this.state.register ? "Register to start " : "Login to keep "}
                mapping your adventures!
              </p>
              {!this.state.register ? (
                <a href="#" onClick={this.handleRegisterToggle}>
                  Go back to Register Form
                </a>
              ) : (
                <h4>
                  Already have an account?{" "}
                  <a href="#" onClick={this.handleRegisterToggle}>
                    Sign in!
                  </a>
                </h4>
              )}
            </div>
          </div>
          <div id="loginRegisterForm">
            {this.state.register && (
              <>
                <input
                  name="firstName"
                  onChange={this.handleChange}
                  placeholder="First Name"
                  type="text"
                />
                <input
                  name="lastName"
                  onChange={this.handleChange}
                  placeholder="Last Name"
                  type="text"
                />
                <input
                  name="username"
                  onChange={this.handleChange}
                  placeholder="Username"
                  type="text"
                />
                <input
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  type="password"
                />
              </>
            )}
            {!this.state.register && (
              <>
                <input
                  name="username"
                  onChange={this.handleChange}
                  placeholder="Username"
                  type="text"
                />
                <input
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  type="password"
                />
              </>
            )}
            {this.props.error && <h4 id="error">{this.props.errorMessage}</h4>}
            {!this.state.register ? (
              <button className="btn" onClick={this.handleLogin}>
                Login
              </button>
            ) : (
              <button className="btn" onClick={this.handleRegister}>
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.auth.error,
    errorMessage: reduxState.auth.errorMessage,
    userId: reduxState.auth.userId
  };
}

export default connect(
  mapStateToProps,
  {
    loginUser,
    registerUser,
    requestVisitedList,
    requestUserPosts,
    requestFriendsList
  }
)(LoginRegisterPopup);
