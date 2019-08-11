import React from 'react';
import './reset.scss';
import './App.scss';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import LoginRegisterPopup from './components/LoginRegisterPopup/LoginRegisterPopup';
import { connect } from 'react-redux';
import AddPost from './components/AddPost/AddPost';
import ViewPosts from './components/ViewPosts/ViewPosts';
import Profile from './components/Profile/Profile';
import Legend from './components/Legend/Legend';

function App(props) {
  return (
    <div className="App">
      <Sidebar />
      <Map />
      {!props.loggedIn ? <LoginRegisterPopup /> : <div></div>}
      {props.addPost && <AddPost />}
      {props.viewPosts && <ViewPosts />}
      {props.profileOpen && <Profile />}
      <Legend />
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    loggedIn: reduxState.auth.loggedIn,
    userId: reduxState.auth.userId,
    username: reduxState.auth.username,
    addPost: reduxState.post.addPost,
    viewPosts: reduxState.post.viewPosts,
    postCountry: reduxState.post.postCountry,
    searchMap: reduxState.map.searchMap,
    geojson: reduxState.map.geojson,
    profileOpen: reduxState.user.profileOpen
  }
}

export default connect(mapStateToProps)(App);
