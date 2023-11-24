import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../Admin/Admin';

function Dashboard() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies] = useCookies(['token']);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.token;
    console.log('Token from cookies:', token);
    if (!token) {
      navigate('/dashboard');
    } else {
      axios
        .get('http://localhost:9000/auth/admin', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log('Dashboard response:', response.data);
          setAuthenticated(true);
          setUserRole(response.data.role);
        })
        .catch((error) => {
          console.error('Error accessing dashboard:', error);
          setAuthenticated(false);
        })
        .finally(() => {
          setIsAuthChecked(true);
          setLoading(false);
        });
    }
  }, [cookies.token, navigate]);

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      navigate('/dashboard');
    } else {
      axios
        .get('http://localhost:9000/auth//users/:role', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log('Dashboard response:', response.data);
          setAuthenticated(true);
          setUserRole(response.data.role);
        })
        .catch((error) => {
          console.error('Error accessing dashboard:', error);
          setAuthenticated(false);
        })
        .finally(() => {
          setIsAuthChecked(true);
          setLoading(false);
        });
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  // Render content based on authentication and role
  if (authenticated) {
    return (
      <div>
        <h1>Dashboard</h1>
        {userRole === 'admin' ? (
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
