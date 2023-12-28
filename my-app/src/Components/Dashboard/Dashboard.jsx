import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../Admin/Admin';
import { useUser } from '../Signin/UserContext';

function Dashboard() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, removeCookie] = useCookies(['token']);
  const { setUserLoggedIn, logout } = useUser();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');

  if (loading) {
    return <p>Loading...</p>;
  }

  // Render content based on authentication and role
  if (authenticated) {
    return (
      <div>
        <h1>Dashboard</h1>
        { role === "admin" ? (
          <div>
            <p>Welcome to the dashboard! You are signed in as an admin.</p>
          </div>
        ) : (
          <p>Welcome to the dashboard! You are signed in as a user.</p>
          
        )}
      </div>
    );
  }
}

export default Dashboard;