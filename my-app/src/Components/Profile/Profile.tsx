import React, { useState } from "react";
import { useAuth } from "../../utils/authContext";
import { FaUser, FaEnvelope, FaCalendar, FaTrophy, FaLock } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-base-200 text-base-content pt-16 pb-32">
      <div className="container mx-auto px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-primary mb-6">User Profile</h2>
            <div className="divider before:bg-primary after:bg-primary"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">{user?.username?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <ProfileField icon={<FaUser />} label="Username" value={user?.username} />
              <ProfileField icon={<FaEnvelope />} label="Email" value={user?.email} />
              <ProfileField icon={<FaCalendar />} label="Member Since" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'} />
              <ProfileField icon={<FaTrophy />} label="Achievements" value={`${user?.achievements?.length || 0} badges`} />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary">Edit Profile</button>
              <button className="btn btn-outline btn-primary">Change Password</button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mt-4">
            <FaLock />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Recent Activities</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {user?.recentActivities?.map((activity, index) => (
                  <tr key={index}>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>{activity.description}</td>
                    <td>{activity.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </span>
    </label>
    <input
      type="text"
      value={value}
      readOnly
      className="input input-bordered w-full bg-base-200 text-base-content"
    />
  </div>
);

export default Profile;