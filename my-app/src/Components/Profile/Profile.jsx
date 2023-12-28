import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Signin/UserContext";
import "./Profile.css";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useUser();
  const [newUsername, setNewUsername] = useState("");
  const [fetchedUsername, setFetchedUsername] = useState("");
  const [errors, setErrors] = useState("");
  const token = Cookies.get("token");

  const addUsername = async (id) => {
    console.log("User ID", id);
    try {
      const response = await axios.put(
        `http://localhost:9000/auth/user/${userLoggedIn._id}`,
        { username: newUsername },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add username response:", response.data);

      // Update the fetched username after successfully adding it
      setFetchedUsername(newUsername);
      console.log("User Response", response.data);
    } catch (error) {
      console.error("Error adding username:", error);
      // Handle error and provide user feedback if needed
      if (error.response) {
        console.log(error.response.data);
        setErrors(error.response.data.message);
      }
    }
  };

  const getUserName = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/auth/username`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Get username response:", response.data);
      setFetchedUsername(response.data.message);
    } catch (error) {
      console.error("Error getting username:", error);
      if (error.response) {
        console.log(error.response.data);
        setErrors(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <>
      <div className="p-4 flex flex-col w-auto">
        <div className="flex-1 flex-row">{userLoggedIn.email}</div>
      </div>
    </>
  );
  return (
    <div className="main-content">
      <div className="card">
        <div className="card-profile-image"></div>
        <div className="card-body">
          <div className="text-center">
            <h3>Signed In As: {userLoggedIn.username}</h3>
          </div>
        </div>
      </div>
      <div className="card bg-secondary shadow">
        <div className="card-body">
          <form>
            <h6 className="heading-small text-muted mb-4">User information</h6>
            <div className="pl-lg-4">
              <div className="form-group focused">
                <label htmlFor="input-username" className="form-control-label">
                  Username
                </label>
                <input
                  type="text"
                  id="input-username"
                  className="form-control form-control-alternative"
                  placeholder={fetchedUsername}
                  value={newUsername} // Controlled component: Set the value to the state
                  onChange={(e) => setNewUsername(e.target.value)} // Update state on user input
                />
                <button onClick={addUsername}>Add Username</button>
              </div>
              <div className="form-group">
                <label htmlFor="input-email" className="form-control-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="input-email"
                  className="form-control form-control-alternative"
                  placeholder={userLoggedIn.email}
                />
              </div>
              <div className="form-group focused">
                <label
                  htmlFor="input-first-name"
                  className="form-control-label"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="input-first-name"
                  className="form-control form-control-alternative"
                  placeholder={userLoggedIn.firstName}
                />
              </div>
              <div className="form-group focused">
                <label htmlFor="input-last-name" className="form-control-label">
                  Last name
                </label>
                <input
                  type="text"
                  id="input-last-name"
                  className="form-control form-control-alternative"
                  placeholder={userLoggedIn.lastName}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {errors && (
        <div className="alert alert-danger" role="alert">
          {errors}
        </div>
      )}
    </div>
  );
};

export default Profile;
