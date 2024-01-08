import { refreshTokenAction } from "../redux/actions/refreshTokenAction";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const authActions = {
  login: (credentials) => async (dispatch) => {
    try {
      const response = await API.post("auth/login", credentials);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response.data,
      });
    }
  },

  logout: () => (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  },

  refreshAuthToken: () => async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await dispatch(refreshTokenAction(refreshToken));
        dispatch({ type: "TOKEN_REFRESH_SUCCESS" });
      } else {
        dispatch({ type: "NO_REFRESH_TOKEN" });
      }
    } catch (error) {
      dispatch({
        type: "TOKEN_REFRESH_FAILURE",
        payload: error.response.data,
      });
    }
  },
};

export default authActions;
