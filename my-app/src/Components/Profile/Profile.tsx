import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { useUser } from "../../utils/userContext";
import { API_URL } from "../../lib/constants";
import { useCookies } from 'react-cookie';


const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser(); 

  const [fetchedUsername, setFetchedUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/username`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("response", response.data);
        setFetchedUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error getting username:", error);
        setError(error.message);
      }
    };

    getUserName();
  }, []);

  console.log("fetchedUsername", fetchedUsername);

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-profile-image"></div>
        <div className="card-body">
          <div className="text-center">
            <h3>Sign in As: {user.username}</h3> 
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
                  value={user.username}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-email" className="form-control-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="input-email"
                  className="form-control form-control-alternative"
                  value={email}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Profile;
