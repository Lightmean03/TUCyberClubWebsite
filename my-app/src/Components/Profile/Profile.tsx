import React, { useState } from "react";
import { useAuth } from "../../utils/authContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-white text-black pt-16 pb-32">
      <div className="container mx-auto px-4">
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-black mb-6">User Profile</h2>
            <div className="divider before:bg-black after:bg-black"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField icon={<FaUser />} label="Username" value={user?.username} />
              <ProfileField icon={<FaEnvelope />} label="Email" value={user?.email} />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="btn bg-gold text-black hover:bg-amber-300">Edit Profile</button>
              <button className="btn btn-outline bg-gold text-black hover:bg-amber-300">Change Password</button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mt-4">
            <FaLock />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text flex items-center text-black">
        {icon}
        <span className="ml-2">{label}</span>
      </span>
    </label>
    <input
      type="text"
      value={value}
      readOnly
      className="input input-bordered w-full bg-white text-black"
    />
  </div>
);

export default Profile;