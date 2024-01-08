import axios from "axios";

const BASE_URL = "http://localhost:9000";

const authInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("auth"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: BASE_URL,
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
