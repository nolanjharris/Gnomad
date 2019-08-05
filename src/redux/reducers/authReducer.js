import axios from 'axios';

const initialState = {
    loggedIn: false,
    userId: '',
    username: '',
    loading: false,
    error: false,
    errorMessage: ''
}

const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', user)
            .then(res => {
                console.log(res.data);
                return res.data
            })
        // .catch(error => console.log(error))
    }
}

export function registerUser(user) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register', user)
            .then(res => res.data)
        // .catch(error => console.log(error))
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout').catch(error => console.log(error))
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${LOGIN_USER}_FULFILLED`:
            console.log('Logged you In!')
            return {
                ...state,
                username: payload.username,
                userId: payload.id,
                loggedIn: true,
                loading: false,
                error: false,
                errorMessage: ''
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
                errorMessage: 'Username or password is incorrect.'
            }
        case `${REGISTER_USER}_FULFILLED`:
            console.log("you are registered")
            return {
                ...state,
                username: payload.username,
                userId: payload.id,
                loggedIn: true,
                loading: false,
                error: false,
                errorMessage: ''
            }
        case `${REGISTER_USER}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${REGISTER_USER}_REJECTED`:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                error: true,
                errorMessage: 'That username is taken. Please try again.'
            }
        case `${LOGOUT_USER}_FULFILLED`:
            console.log('Logged you out!')
            return {
                ...state,
                username: '',
                loggedIn: false,
                loading: false,
                error: false,
                errorMessage: ''
            }
        case `${LOGOUT_USER}_PENDING`:
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
}