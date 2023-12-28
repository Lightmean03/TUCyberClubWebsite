import React, { useState } from "react";
import { isEmail } from "validator";
import "./Signin.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "src/lib/constants";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserLoggedIn } = useUser();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post("http://localhost:9000/auth/refresh", {
        refreshToken,
      });
      const newAccessToken = response.data.accessToken;
      Cookies.set("token", newAccessToken, { secure: true });
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Please provide an email address.";
    } else if (!isEmail(email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please provide a password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const attemptSignin = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        data,
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      const accessToken = response.data.token;
      const user = response.data.user;
      const refreshToken = response.data.refreshToken;

      Cookies.set("token", accessToken, { secure: true });
      setUserLoggedIn(user);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.status === 401) {
        const refreshToken = Cookies.get("refreshToken");

        if (refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken) {
              attemptSignin(data);
            }
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            // Handle refresh error, show user-friendly message, or redirect to login
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = () => {
    if (validateForm() && !isLoading) {
      const data = { email, password };
      attemptSignin(data);
    }
  };

  return (
    <>
      <div className="bg">
        <div className="sign-container">
          <h3 className="signin-title">LOGIN</h3>
          <div className="signin-form">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md text-black"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md text-black"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="signin-submit-btn"
              onClick={handleSignin}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Submit"}
            </button>
            <button type="reset" className="signin-reset-btn">
              Reset
            </button>
            <div className="signin-signup-link">
              Don't have an account?
              <button type="button" className="signin-signup-btn">
                <a href="/signup"> Sign Up</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
