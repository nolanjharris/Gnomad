import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import './LoginRegisterPopup.scss';

class LoginRegisterPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            register: false
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = () => {
        const user = { username: this.state.username, password: this.state.password }
        axios.post('/auth/login', user).then(res => {
            console.log('Logged in as ' + res.data.username);
            this.props.isLoggedIn();
        }).catch(error => console.log(error));
    }

    handleLogout = () => {
        axios.get('/auth/logout').then(res => {
            console.log('logged out succesfully')
        })
    }

    render() {
        return (
            <Popup position={[-72, 0]}>
                <div id="login-register-popup-content">
                    <h2>Welcome to Gnomad!</h2>
                    <p>Login to start mapping your adventures!</p>
                    <input
                        name="username"
                        placeholder="username"
                        onChange={this.handleChange}
                        type="text"
                    />
                    <input
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                        type="password"
                    />
                    <button onClick={this.handleLogin}>Login</button>

                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </Popup >
        )
    }
}

export default LoginRegisterPopup;