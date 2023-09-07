import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';
import dataProvider from './dataProvider'; 

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, , removeCookie] = useCookies(['token']);
  const [userRole, setUserRole] = useState('user'); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.token;
    console.log('Token from cookies:', token);
    if (token) {
      axios
        .get('http://localhost:9000/auth/admin/users/', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log('User Role:', response.data.role);
          setAuthenticated(true);
          setUserRole(response.data.role);
        })
        .catch((error) => {
          console.error('Error accessing user role:', error);
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, [cookies.token]);

  const handleSignOut = () => {
    axios
      .post('http://localhost:9000/auth/logout')
      .then((response) => {
        console.log('Logout response:', response.data);
        removeCookie('token');
        navigate('/signin'); // Redirect to sign-in page after signing out
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  if (!authenticated) {
    navigate('/signin');
    return null; 
  }

  return (
    <div>
      <div>
        <p>You are signed in as {userRole === 'admin' ? 'an admin' : 'a user'}.</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList} /> 
        <Resource name="dashboard" list={ListGuesser} />
        
      </Admin>
    </div>
  );
};

export default AdminPanel;
