import { API, handleErrors } from "../api/utilis";

export const getUsername = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await API.get("/auth/username", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    localStorage.setItem("username", JSON.stringify(data));
    return { error: null, data };
  } catch (error) {
    return handleErrors(error);
  }
};

export const userData = async () => {
  try {
    const response = await API.get("/auth/users");
    const data = response.data;
    return { error: null, data };
  } catch (error) {
    return handleErrors(error);
  }
};

export const getUsersByRole = async (role) => {
  try {
    const response = await API.get(`/auth/users/${role}`);
    const data = response.data;
    return { error: null, data };
  } catch (error) {
    return handleErrors(error);
  }
};
