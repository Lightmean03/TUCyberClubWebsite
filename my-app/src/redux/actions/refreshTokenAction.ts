import axios from "axios";
import { REFRESH_TOKEN_SUCCESS } from "./actionTypes";

const API = axios.create({
  baseURL: process.env.REACT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export const refreshTokenAction = (refreshToken) => async (dispatch) => {
  try {
    const response = await API.post("auth/refresh", {
      refreshToken,
    });
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = response.data;
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: payload,
    });
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    localStorage.removeItem("user");
    dispatch({
      type: "Refresh Token Failed",
      payload: error.response.data,
    });
  }
};
