import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

const root = combineReducers({
    auth: authReducer,
    user: userReducer,
    post: postReducer
})

export default createStore(root, applyMiddleware(promise));