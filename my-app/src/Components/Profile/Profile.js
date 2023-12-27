import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../Admin/Admin";
import { useUser } from "../Signin/UserContext";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);
  const { userLoggedIn, logout } = useUser();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-profile-image"></div>
        <div className="card-body">
          <div className="text-center">
            <h3>Signed In As: {userLoggedIn.email}</h3>
          </div>
        </div>
      </div>
      <div className="card bg-secondary shadow">
        <div className="card-body">
          <form>
            <h6 className="heading-small text-muted mb-4">User information</h6>
            <div className="pl-lg-4">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-username">
                  Username
                </label>
                <input
                  type="text"
                  id="input-username"
                  className="form-control form-control-alternative"
                  placeholder={userLoggedIn.username}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-email">
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
                  className="form-control-label"
                  htmlFor="input-first-name"
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
                <label className="form-control-label" htmlFor="input-last-name">
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
    </div>
  );
};

export default Profile;
