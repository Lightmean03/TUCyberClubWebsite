import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
