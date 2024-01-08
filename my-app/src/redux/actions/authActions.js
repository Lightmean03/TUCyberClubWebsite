import { signIn, signUp, signOut } from "../api/authAPI";
import isValidToken from "../../utils/authUtlis";
import { refreshTokenAction } from "./refreshTokenAction";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
} from "../actions/actionTypes";

export const initializeAuth = () => async (dispatch) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const accessToken = storedUser?.accessToken;
    const refreshToken = storedUser?.refreshToken;

    if (accessToken && refreshToken) {
      const isValid = isValidToken();

      if (isValid) {
        dispatch(loginSuccess({ accessToken, refreshToken }));
      } else {
        const refreshResponse = await dispatch(
          refreshTokenAction(refreshToken),
        );

        if (refreshResponse.error) {
          dispatch(loginFailure(refreshResponse.error));
        } else {
          dispatch(loginSuccess(refreshResponse.data));
        }
      }
    } else {
      // Handle the case where either accessToken or refreshToken is missing
      dispatch(loginFailure("Access token or refresh token is missing"));
    }
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

console.log("initializeAuth", initializeAuth);

export const setAccessToken = (accessToken) => async (dispatch) => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload: { accessToken },
  });
};

export const setRefreshToken = (refreshToken) => async (dispatch) => {
  dispatch({
    type: SET_REFRESH_TOKEN,
    payload: { refreshToken },
  });
};

export const loginSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    user: userData,
    accessToken: userData.accessToken,
    refreshToken: userData.refreshToken,
  },
});

export const loginFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const signupSuccess = (userData) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: userData,
});

export const signupFailure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

export const logoutSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_USER_FAILURE,
  payload: error,
});

export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await signIn(formData);
    const token = response.data.token;
    const user = response.data.user;
    console.log("token", token);
    dispatch({ type: "SET_TOKEN", payload: { token } });
    dispatch({ type: "SET_USER_DATA", payload: { user } });
    dispatch(loginSuccess(user, token));
    return { error: null, data: response.data };
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const signupUser = (formData) => async (dispatch) => {
  try {
    const { error, data } = await signUp(formData);

    if (!error) {
      dispatch(signupSuccess(data));
    } else {
      dispatch(signupFailure(error));
    }
  } catch (error) {
    dispatch(signupFailure(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const { error, data } = await signOut();
    if (!error) {
      dispatch(logoutSuccess());
    } else {
      dispatch(logoutFailure(error));
    }
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};
