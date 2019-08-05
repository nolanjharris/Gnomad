import React from 'react';
import './Sidebar.scss';
import { logoutUser } from '../../redux/reducers/authReducer';
import { connect } from 'react-redux';

function Sidebar(props) {

    return (
        <div className="sidebar">
            <h1><span>G</span>nomad</h1>
            {
                props.loggedIn &&
                <>
                    <h3>Logged in as</h3>
                    <h4>{props.username}</h4>
                    <a href="#" onClick={props.logoutUser}>logout</a>
                </>
            }
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        loggedIn: reduxState.auth.loggedIn,
        username: reduxState.auth.username
    }
}

export default connect(mapStateToProps, { logoutUser })(Sidebar);