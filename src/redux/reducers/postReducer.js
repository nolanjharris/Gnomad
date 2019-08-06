import axios from 'axios';

const initialState = {
    postPage: false,
    postCountry: [],
    posts: [],
    loading: false
}

const OPEN_POST_FORM = 'OPEN_POST_FORM';
const REQUEST_COUNTRY_POSTS = 'REQUEST_COUNTRY_POSTS';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

export function openPostForm(country) {
    return {
        type: OPEN_POST_FORM,
        payload: country
    }
}

export function requestCountryPosts(country) {
    return {
        type: REQUEST_COUNTRY_POSTS,
        payload: axios.get(`/api/posts/${country}`)
            .then(res => res.data)
    }
}

export function addPost(post) {
    return {
        type: ADD_POST,
        payload: axios.post('/api/posts', post)
    }
}

export function editPost(country, post) {
    return {
        type: EDIT_POST,
        payload: axios.put(`/api/posts/${country}`, post)
    }
}

export function deletePost(country) {
    return {
        type: DELETE_POST,
        payload: axios.delete(`/api/posts/${country}`)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case OPEN_POST_FORM:
            return {
                ...state,
                postPage: true,
                postCountry: payload
            }
        case `${REQUEST_COUNTRY_POSTS}_FULFILLED`:
            return {
                ...state,
                posts: payload,
                loading: false,
                postPage: false
            }
        case `${REQUEST_COUNTRY_POSTS}_PENDING`:
            return {
                ...state,
                loading: true,
                postPage: false
            }
        case `${ADD_POST}_FULFILLED`:
            return {
                ...state,
                loading: false,
                postPage: false
            }
        case `${ADD_POST}_PENDING`:
            return {
                ...state,
                loading: true,
                postPage: false
            }
        case `${EDIT_POST}_FULFILLED`:
            return {
                ...state,
                loading: false,
                postPage: false
            }
        case `${EDIT_POST}_PENDING`:
            return {
                ...state,
                loading: true,
                postPage: false
            }
        case `${DELETE_POST}_FULFILLED`:
            return {
                ...state,
                loading: false,
                postPage: false
            }
        case `${DELETE_POST}_PENDING`:
            return {
                ...state,
                loading: true,
                postPage: false
            }
        default: return state;
    }
}