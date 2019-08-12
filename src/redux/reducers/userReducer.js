import axios from "axios";

const initialState = {
  visitedList: [],
  posts: [],
  friendsList: [],
  pendingFriendRequests: [],
  sentFriendRequests: [],
  loading: false,
  requested: false,
  profileOpen: false,
  allUsers: [],
  legendOpen: false
};

const REQUEST_VISITED_LIST = "REQUEST_VISITED_LIST";
const REQUEST_USER_POSTS = "REQUEST_USER_POSTS";
const REMOVE_USER_COUNTRY = "REMOVE_USER_COUNTRY";
const ADD_USER_COUNTRY = "ADD_USER_COUNTRY";
const RESET_USER = "RESET_USER";
const OPEN_PROFILE = "OPEN_PROFILE";
const CLOSE_PROFILE = "CLOSE_PROFILE";
const REQUEST_FRIENDS_LIST = "REQUEST_FRIENDS_LIST";
const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";
const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
const UPDATE_FRIENDS_COLOR = "UPDATE_FRIEND_COLOR";
const REQUEST_ALL_USERS = "REQUEST_ALL_USERS";
const TOGGLE_LEGEND = "TOGGLE_LEGEND";
const TOGGLE_FRIEND = "TOGGLE_FRIEND";

export function requestVisitedList(id) {
  return {
    type: REQUEST_VISITED_LIST,
    payload: axios.get(`/api/user/${id}/country`).then(res => res.data)
  };
}

export function requestUserPosts(id) {
  console.log(id);
  return {
    type: REQUEST_USER_POSTS,
    payload: axios.get(`/api/user/${id}/posts`).then(res => res.data)
  };
}

export function removeUserCountry(country) {
  return {
    type: REMOVE_USER_COUNTRY,
    payload: axios.delete(`/api/user/country/${country}`).then(res => res.data)
  };
}

export function addUserCountry(country) {
  return {
    type: ADD_USER_COUNTRY,
    payload: axios.post(`/api/user/country/${country}`).then(res => res.data)
  };
}

export function resetUser() {
  return {
    type: RESET_USER
  };
}

export function openProfile() {
  return {
    type: OPEN_PROFILE
  };
}

export function closeProfile() {
  return {
    type: CLOSE_PROFILE
  };
}

export function requestFriendsList(id) {
  return {
    type: REQUEST_FRIENDS_LIST,
    payload: axios.get(`/api/user/friends/${id}`).then(res => res.data)
  };
}

export function sendFriendRequest(id) {
  return {
    type: SEND_FRIEND_REQUEST,
    payload: axios
      .post("/api/user/friends/add", { userId: id })
      .then(res => res.data)
  };
}

export function acceptFriendRequest(id) {
  return {
    type: ACCEPT_FRIEND_REQUEST,
    payload: axios
      .put("/api/user/friends/accept", { userId: id })
      .then(res => res.data)
  };
}

export function updateFriendsColor(userId, friendColor) {
  return {
    type: UPDATE_FRIENDS_COLOR,
    payload: axios
      .put("/api/user/friends/color", { userId, friendColor })
      .then(res => res.data)
  };
}

export function requestAllUsers() {
  return {
    type: REQUEST_ALL_USERS,
    payload: axios.get("/api/user/all").then(res => res.data)
  };
}

export function toggleLegend() {
  return {
    type: TOGGLE_LEGEND
  };
}

export function toggleFriend(id) {
  return {
    type: TOGGLE_FRIEND,
    payload: id
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  let unfriended;
  let friends;
  switch (type) {
    case `${REQUEST_VISITED_LIST}_FULFILLED`:
      let request = payload === [] ? false : true;
      return {
        ...state,
        requested: request,
        visitedList: payload,
        loading: false
      };
    case `${REQUEST_VISITED_LIST}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REQUEST_USER_POSTS}_FULFILLED`:
      console.log(payload);
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case `${REQUEST_USER_POSTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REMOVE_USER_COUNTRY}_FULFILLED`:
      return {
        ...state,
        loading: false,
        countries: payload,
        requested: false
      };
    case `${REMOVE_USER_COUNTRY}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${ADD_USER_COUNTRY}_FULFILLED`:
      return {
        ...state,
        countries: payload,
        loading: false,
        requested: false
      };
    case `${ADD_USER_COUNTRY}_PENDING`:
      return {
        ...state,
        loading: true,
        requested: false
      };
    case OPEN_PROFILE:
      return {
        ...state,
        loading: false,
        profileOpen: true
      };
    case CLOSE_PROFILE:
      return {
        ...state,
        loading: false,
        profileOpen: false
      };
    case `${REQUEST_FRIENDS_LIST}_FULFILLED`:
      unfriended = state.allUsers.filter(
        user =>
          payload[0].findIndex(friend => friend.username === user.username) < 0
      );
      payload[0].map(friend => (friend.visible = true));
      return {
        ...state,
        loading: false,
        allUsers: unfriended,
        friendsList: payload[0],
        pendingFriendRequests: payload[1],
        sentFriendRequests: payload[2]
      };
    case `${REQUEST_FRIENDS_LIST}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${SEND_FRIEND_REQUEST}_FULFILLED`:
      unfriended = state.allUsers.filter(
        user =>
          payload[0].findIndex(friend => friend.username === user.username) < 0
      );
      console.log(payload);
      return {
        ...state,
        loading: false,
        allUsers: unfriended,
        sentFriendRequests: payload[2]
      };
    case `${SEND_FRIEND_REQUEST}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${ACCEPT_FRIEND_REQUEST}_FULFILLED`:
      unfriended = state.allUsers.filter(
        user =>
          payload[0].findIndex(friend => friend.username === user.username) < 0
      );
      payload[0].map(friend => (friend.visible = true));
      return {
        ...state,
        loading: false,
        allUsers: unfriended,
        friendsList: payload[0],
        pendingFriendRequests: payload[1],
        sentFriendRequests: payload[2]
      };
    case `${ACCEPT_FRIEND_REQUEST}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REQUEST_ALL_USERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        allUsers: payload
      };
    case `${REQUEST_ALL_USERS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case TOGGLE_LEGEND:
      return {
        ...state,
        legendOpen: !state.legendOpen
      };
    case TOGGLE_FRIEND:
      let foundIndex = state.friendsList.findIndex(e => e.user_id === payload);
      let toggle = !state.friendsList[foundIndex].visible;
      friends = [...state.friendsList];
      friends[foundIndex].visible = toggle;
      console.log(friends);
      return {
        ...state,
        friendsList: friends
      };
    case `${UPDATE_FRIENDS_COLOR}_FULFILLED`:
      console.log(payload);
      let friendIndex = state.friendsList.findIndex(
        e => e.user_id === payload.userId
      );
      console.log(state.friendsList[friendIndex]);
      let updatedFriend = [...state.friendsList];
      updatedFriend[friendIndex].friend_color = payload.friendColor;
      console.log(updatedFriend);
      return {
        ...state,
        friendsList: updatedFriend
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
}
