import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserList from './UserList'; // Import your UserList component
import { useUser } from '../Signin/UserContext';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [cookies, , removeCookie] = useCookies(['token']);
  const { setUserLoggedIn, logout } = useUser();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      axios
        .get('http://localhost:9000/auth/admin', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log('Verify response:', response.data);
          setAuthenticated(true); // Update authentication status
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          removeCookie('token');
          setAuthenticated(false); // Update authentication status
        });
    }
  }, [cookies.token, removeCookie, setAuthenticated]);

  const handleSignOut = () => {
    axios
      .post('http://localhost:9000/auth/logout')
      .then((response) => {
        console.log('Logout response:', response.data);
        removeCookie('token');
        setAuthenticated(false); // Update authentication status
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  if (!authenticated) {
    // Redirect to the login page if not authenticated
    return <Link to="/signin" />;
  }

  return (
    <div>    
      <Admin dataProvider={simpleRestProvider('http://localhost:9000/auth/users')}>
      </Admin>
    </div>
  );
};

export default AdminPanel;
