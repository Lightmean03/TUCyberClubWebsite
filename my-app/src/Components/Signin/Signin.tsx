import React, { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/userContext";
import axios from "axios";
import { TextField, Button } from "@mui/material"; // Importing TextField and Button from Material-UI
import { API_URL } from "../../lib/constants";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });
      console.log("response", response);
      localStorage.setItem("token", response.data.token);
      if (!response.data) {
        setIsLoading(false);
        setError("Incorrect email or password.");
        return;
      }
      setUser(response.data);
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred while signing in.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h3 className="text-2xl font-bold mb-4 text-center text-black">LOGIN</h3>
        <div className="signin-form">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border  rounded-md focus:outline-none text-black"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md "
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Submit"}
            </button>
            <button
              type="reset"
              className="w-full mt-2 border  py-2 rounded-md transition duration-300  focus:text-white"
            >
              Reset
            </button>
            </div>
          </form>
          <div className="text-center mt-4 text-black">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </a>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Signin;
