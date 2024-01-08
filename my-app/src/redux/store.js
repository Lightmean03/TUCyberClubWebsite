import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import tokenMiddleware from "../middlewares/tokenMiddleWare";
import { initializeAuth } from "../redux/actions/authActions";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";

const createAppStore = async () => {
  try {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, tokenMiddleware),
    });

    // Dispatch the initializeAuth action
    await store.dispatch(initializeAuth());
    return store;
  } catch (err) {
    console.error("Error creating the store:", err);
    throw new Error("Some error occurred");
  }
};

export default createAppStore;
