import axios from "axios";

const initialState = {
  loggedIn: false,
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  profilePic: "",
  loading: false,
  error: false,
  errorMessage: "",
  userColor: ""
};

const LOGIN_USER = "LOGIN_USER";
const REGISTER_USER = "REGISTER_USER";
const LOGOUT_USER = "LOGOUT_USER";
const UPDATE_PROFILE_PIC = "UPDATE_PROFILE_PIC";
const UPDATE_USER_COLOR = "UPDATE_USER_COLOR";

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: axios.post("/auth/login", user).then(res => {
      return res.data;
    })
    // .catch(error => console.log(error))
  };
}

export function registerUser(user) {
  return {
    type: REGISTER_USER,
    payload: axios.post("/auth/register", user).then(res => res.data)
    // .catch(error => console.log(error))
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: axios.get("/auth/logout").catch(error => console.log(error))
  };
}

export function updateProfilePic(profilePic) {
  return {
    type: UPDATE_PROFILE_PIC,
    payload: axios
      .put("/api/user/profile", { profilePic })
      .then(res => res.data)
  };
}

export function updateUserColor(color) {
  return {
    type: UPDATE_USER_COLOR,
    payload: axios
      .put("/api/user/color", { userColor: color })
      .then(res => res.data)
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${LOGIN_USER}_FULFILLED`:
      return {
        ...state,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userId: payload.id,
        profilePic: payload.profile_pic,
        loggedIn: true,
        loading: false,
        error: false,
        errorMessage: "",
        userColor: payload.country_color
      };
    case `${LOGIN_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${LOGIN_USER}_REJECTED`:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: true,
        errorMessage: "Username or password is incorrect."
      };
    case `${REGISTER_USER}_FULFILLED`:
      return {
        ...state,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userId: payload.id,
        loggedIn: true,
        loading: false,
        error: false,
        errorMessage: ""
      };
    case `${REGISTER_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REGISTER_USER}_REJECTED`:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: true,
        errorMessage: "That username is taken. Please try again."
      };
    case `${LOGOUT_USER}_FULFILLED`:
      return initialState;
    case `${LOGOUT_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UPDATE_PROFILE_PIC}_FULFILLED`:
      return {
        ...state,
        profilePic: payload,
        loading: false
      };
    case `${UPDATE_PROFILE_PIC}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UPDATE_USER_COLOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        userColor: payload
      };
    case `${UPDATE_USER_COLOR}_PENDING`:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
