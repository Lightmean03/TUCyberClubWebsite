import { API, handleErrors } from "./utilis";

export const signIn = async (formData: any) => {
  try {
    const response = await API.post("/auth/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = response.data.token;
    console.log("token", token);
    localStorage.setItem("token", response.data.token);
    const data = response.data;
    console.log("data", data.user);
    console.log("token", token);
    return { error: null, data };
  } catch (error) {
    return handleErrors(error);
  }
};

export const signUp = async (formData: any) => {
  try {
    const response = await API.post("/auth/Signup", formData);
    const data = response.data;
    return { error: null, data };
  } catch (error) {
    return handleErrors(error);
  }
};

export const signOut = async () => {
  try {
    const response = await API.post("/auth/signout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log("data", data);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return { error: null, data };
  } catch (error) {
    return handleErrors(error);
  }
};
