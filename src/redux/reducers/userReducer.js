import axios from 'axios';

const initialState = {
    loggedIn: false,
    firstName: '',
    lastName: '',
    username: '',
    loading: false
}

const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/api/login', { user })
            .then(res => res.data)
            .catch(error => console.log(error));
    }
}

export function registerUser(user) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/api/register', { user })
            .then(res => res.data)
            .catch(error => console.log(error));
    }
}

export default reducer(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case `${LOGIN_USER}_FULFILLED`:
            return {
                ...state,
                username: payload.user.username,
                loggedIn: true,
                loading: false
            };
        case `${LOGIN_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${REGISTER_USER}_FULFILLED`:
            return {
                ...state,
                username: payload.user.username,
                loggedIn: true,
                loading: false
            }
        case `${REGISTER_USER}_PENDING`:
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
}