import axios from "axios";
import { API_URL } from "../../lib/constants";

const authInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("auth"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(authInterceptor);

export const handleErrors = (error) => {
  try {
    const errormessage = error.response?.data?.massage || "An error occurred";
    const data = null;
    return { error: errormessage, data };
  } catch (err) {
    return { error: "An error occurred" };
  }
};
