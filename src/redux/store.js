import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';

const root = combineReducers({
    userReducer
})

export default createStore(root, applyMiddleware(promise));