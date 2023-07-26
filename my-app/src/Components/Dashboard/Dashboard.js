import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Dashboard() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies] = useCookies(['token']);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state for checking authentication completion

  useEffect(() => {
    const token = cookies.token;
    console.log('Token from cookies:', token);
    if (!token) {
      // Redirect to the home page if the token is not found
      navigate('/');
    } else {
      // Send a GET request to the dashboard endpoint
      axios
        .get('http://localhost:9000/auth/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log('Dashboard response:', response.data);
          // If the response is successful, the user is authenticated
          setAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error accessing dashboard:', error);
          // If there's an error, the user is not authenticated
          setAuthenticated(false);
        })
        .finally(() => {
          // Set the authentication check completion flag to true
          setIsAuthChecked(true);
        });
    }
  }, [cookies.token, navigate]);

  // Check if the authentication check is completed before rendering
  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  // Handle the authenticated and not authenticated cases
  return authenticated ? (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      {/* Your dashboard content goes here */}
    </div>
  ) : (
    <p>You are not authenticated. Redirecting... </p>
  );
}

export default Dashboard;
