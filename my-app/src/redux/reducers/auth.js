import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_USER_DATA,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
} from "../actions/actionTypes";
import { GET_USERNAME, GET_USERNAME_FAILURE } from "../actions/userTypes";

const initialState = {
  user: null,
  token: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("authReducer", action);
  console.log("type", type);
  console.log("payload", payload);

  switch (type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload ? payload : null,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: payload ? payload : null,
      };
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case GET_USERNAME_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: payload ? payload : null,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        error: null,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        error: payload ? payload : null,
      };

    case LOGOUT_USER_SUCCESS:
      return initialState;

    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: payload ? payload.user : null,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
        error: null,
      };

    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        error: payload ? payload : null,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: payload ? payload.accessToken : null,
        refreshToken: payload ? payload.refreshToken : null,
      };

    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        userData: null,
        refreshToken: null,
        accessToken: null,
        error: payload ? payload : null,
      };

    default:
      return state;
  }
};

export default authReducer;
