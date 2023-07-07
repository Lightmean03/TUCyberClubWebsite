import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to the login page if token is not found
      navigate('/');
    } else {
      // Send a GET request to the dashboard endpoint
      axios
        .get('http://localhost:9000/dashboard', {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response.data);
          // Handle the dashboard data here
        })
        .catch((error) => {
          console.error('Error accessing dashboard:', error);
          // Redirect to the login page if there's an error
          navigate('/');
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

export default Dashboard;
