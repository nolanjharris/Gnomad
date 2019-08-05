import React from 'react';
import './reset.scss';
import './App.scss';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import LoginRegisterPopup from './components/LoginRegisterPopup/LoginRegisterPopup';
import { connect } from 'react-redux';
import AddPost from './components/AddPost/AddPost';

function App(props) {
  return (
    <div className="App">
      <Sidebar />
      <Map />
      {!props.loggedIn ? <LoginRegisterPopup /> : <div></div>}
      <AddPost />
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    loggedIn: reduxState.auth.loggedIn,
    username: reduxState.auth.username
  }
}

export default connect(mapStateToProps)(App);
