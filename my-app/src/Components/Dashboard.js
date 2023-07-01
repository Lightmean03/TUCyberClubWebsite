import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  // Simulating user authentication
  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking a token in local storage)
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the sign-in page
      history.push('/');
    } else {
      // Fetch user information from an API or local storage
      const user = JSON.parse(localStorage.getItem('user'));
      setUserInfo(user);
    }
  }, [history]);

  // Function to handle sign out
  const handleSignOut = () => {
    // Clear user data and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Redirect to the sign-in page
    history.push('/');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {userInfo && (
        <div>
          <p>Hello, {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
