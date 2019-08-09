import axios from 'axios';

const initialState = {
    visitedList: [],
    posts: [],
    friendsList: [],
    loading: false,
    requested: false,
    profileOpen: false
}

const REQUEST_VISITED_LIST = 'REQUEST_VISITED_LIST';
const REQUEST_USER_POSTS = 'REQUEST_USER_POSTS';
const REMOVE_USER_COUNTRY = 'REMOVE_USER_COUNTRY';
const ADD_USER_COUNTRY = 'ADD_USER_COUNTRY';
const RESET_USER = 'RESET_USER';
const OPEN_PROFILE = 'OPEN_PROFILE';
const CLOSE_PROFILE = 'CLOSE_PROFILE';

export function requestVisitedList(id) {
    return {
        type: REQUEST_VISITED_LIST,
        payload: axios.get(`/api/user/${id}/country`)
            .then(res => res.data)
    }
}

export function requestUserPosts(id) {
    console.log(id);
    return {
        type: REQUEST_USER_POSTS,
        payload: axios.get(`/api/user/${id}/posts`)
            .then(res => res.data)
    }
}

export function removeUserCountry(country) {
    return {
        type: REMOVE_USER_COUNTRY,
        payload: axios.delete(`/api/user/country/${country}`)
            .then(res => res.data)
    }
}

export function addUserCountry(country) {
    return {
        type: ADD_USER_COUNTRY,
        payload: axios.post(`/api/user/country/${country}`)
            .then(res => res.data)
    }
}

export function resetUser() {
    return {
        type: RESET_USER
    }
}

export function openProfile() {
    return {
        type: OPEN_PROFILE
    }
}

export function closeProfile() {
    return {
        type: CLOSE_PROFILE
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${REQUEST_VISITED_LIST}_FULFILLED`:
            return {
                ...state,
                requested: true,
                visitedList: payload,
                loading: false
            }
        case `${REQUEST_VISITED_LIST}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${REQUEST_USER_POSTS}_FULFILLED`:
            console.log(payload);
            return {
                ...state,
                posts: payload,
                loading: false,
                requested: false
            }
        case `${REQUEST_USER_POSTS}_PENDING`:
            return {
                ...state,
                loading: true,
                requested: false
            }
        case `${REMOVE_USER_COUNTRY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                countries: payload,
                requested: false
            }
        case `${REMOVE_USER_COUNTRY}_PENDING`:
            return {
                ...state,
                loading: true,
                requested: false
            }
        case `${ADD_USER_COUNTRY}_FULFILLED`:
            return {
                ...state,
                countries: payload,
                loading: false,
                requested: false
            }
        case `${ADD_USER_COUNTRY}_PENDING`:
            return {
                ...state,
                loading: true,
                requested: false
            }
        case OPEN_PROFILE: 
            return {
                ...state,
                loading: false,
                requested: false,
                profileOpen: true
            }
        case CLOSE_PROFILE:
            return {
                ...state,
                loading: false,
                requested: false,
                profileOpen: false
            }
        case RESET_USER:
            return initialState;
        default: return state;
    }
}