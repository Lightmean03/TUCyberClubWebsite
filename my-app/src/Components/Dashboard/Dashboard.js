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

 
  useEffect(() => {
    const token = cookies.token;
    console.log('Token:', token);
      axios
        .get('http://localhost:9000/auth/admin', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log('Verify response:', response.data);
          setAuthenticated(true); // Update authentication status
          setUserLoggedIn(true);
          setRole(response.data.role);
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          removeCookie('token');
          setAuthenticated(false); // Update authentication status
          setUserLoggedIn(false);
        });
    }, [cookies.token, removeCookie, setAuthenticated, setUserLoggedIn]);

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
            <AdminPanel />
          </div>
        ) : (
          <p>Welcome to the dashboard! You are signed in as a user.</p>
          
        )}
      </div>
    );
  }
}

export default Dashboard;