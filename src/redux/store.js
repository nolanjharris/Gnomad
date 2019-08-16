import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import mapReducer from "./reducers/mapReducer";

const root = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  map: mapReducer
});

export default createStore(root, applyMiddleware(promise));
