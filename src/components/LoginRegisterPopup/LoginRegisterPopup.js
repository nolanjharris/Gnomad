/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginRegisterPopup.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { loginUser, registerUser } from '../../redux/reducers/authReducer';



class LoginRegisterPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            register: true
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleRegisterToggle = () => {
        this.setState({ register: !this.state.register })
    }

    handleLogin = () => {
        const user = { username: this.state.username, password: this.state.password }
        this.props.loginUser(user);
        // axios.post('/auth/login', user).then(res => {
        //     console.log('Logged in as ' + res.data.username);
        // }).catch(error => console.log(error));
    }

    handleRegister = () => {
        const { firstName, lastName, username, password } = this.state;
        const user = { firstName, lastName, username, password };
        this.props.registerUser(user);
        // axios.post('/auth/register', { user }).then(res => {
        //     console.log('Registered and Logged in as ' + res.data.user)
        // })
    }

    render() {
        return (
            <div id="login-register-background-div">
                <div id="login-register-popup-content">
                    <div id="login-title-div">
                        <h2>Welcome to <span>G</span>nomad!</h2>
                        <div>
                            <p>{this.state.register ? 'Register now' : 'Login'} to start mapping your adventures!</p>
                            {
                                !this.state.register ?
                                    <a href="#" onClick={this.handleRegisterToggle}>Go back to Register Form</a>
                                    : <h4>Already have an account? <a href="#" onClick={this.handleRegisterToggle}>Click here to sign in!</a></h4>
                            }
                        </div>
                    </div>
                    <MuiThemeProvider id="loginRegisterForm">
                        <>
                            {this.state.register &&
                                <>
                                    <TextField
                                        name="firstName"
                                        floatingLabelText="First Name"
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        name="lastName"
                                        floatingLabelText="Last Name"
                                        onChange={this.handleChange}
                                    />
                                </>
                            }
                            <TextField
                                name="username"
                                floatingLabelText="Username"
                                onChange={this.handleChange}
                            />
                            <TextField
                                name="password"
                                floatingLabelText="Password" type="password"
                                onChange={this.handleChange}
                            />
                            {this.props.error && <h4 id="error">{this.props.errorMessage}</h4>}
                            {!this.state.register ?
                                <RaisedButton
                                    className="btn"
                                    label="Login"
                                    primary={true}
                                    onClick={this.handleLogin}
                                />
                                :
                                <RaisedButton
                                    className="btn"
                                    label="Register"
                                    primary={true}
                                    onClick={this.handleRegister}
                                />
                            }

                        </>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        error: reduxState.auth.error,
        errorMessage: reduxState.auth.errorMessage
    }
}


export default connect(mapStateToProps, { loginUser, registerUser })(LoginRegisterPopup);