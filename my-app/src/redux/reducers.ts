import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import postReducer from "./reducers/post";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer
});

export default rootReducer;