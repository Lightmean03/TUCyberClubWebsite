import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsername } from "../../redux/actions/userActions";

const Profile = () => {
  const navigate = useNavigate();
  const [fetchedUsername, setFetchedUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state?.auth?.username);
  const error = useSelector((state) => state?.auth?.error);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const getUserName = async () => {
    try {
       dispatch(getUsername());
      setFetchedUsername(userLoggedIn);
    } catch (error) {
      console.error("Error getting username:", error);
    }
  };

  useEffect(() => {
    getUserName();
  }, [dispatch]);

  console.log("fetchedUsername", fetchedUsername);


  console.log("user", userLoggedIn);

 
  return (
    <div className="main-content">
      <div className="card">
        <div className="card-profile-image"></div>
        <div className="card-body">
          <div className="text-center">
            <h3>Signed In As: {fetchedUsername}</h3>
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
                  value={fetchedUsername}
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
              <div className="form-group focused">
                <label
                  htmlFor="input-first-name"
                  className="form-control-label"
                >
                  First name
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Profile;