import React, { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../utils/authContext";


const Profile = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  return (
    <div className="main-content">
      <div className="card">
        <div className="card-body">
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
                  value={user?.username}
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
