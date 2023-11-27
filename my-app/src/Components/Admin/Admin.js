import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserList from './UserList'; // Import your UserList component
import { useUser } from '../Signin/UserContext';
import { Link } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Table, Button, Modal, Form, Input, message } from 'antd';
import {Content, Header} from 'antd/lib/layout/layout';

const AdminPanel = () => {
  const [cookies, , removeCookie] = useCookies(['token']);
  const { setUserLoggedIn, logout } = useUser();
  const [authenticated, setAuthenticated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);
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
          setUserData(response.data.users);
          setAdminData(response.data.admins);
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          removeCookie('token');
          setAuthenticated(false); // Update authentication status
          setUserLoggedIn(false);
        });
    }, [cookies.token, removeCookie, setAuthenticated, setUserLoggedIn]);

 
   
  
    // Show modal for granting permissions
    const showModal = (record) => {
      form.setFieldsValue(record);
      setIsModalVisible(true);
    };
 
    
    
    const userColumns = [
      {
        title: 'User Data',
        key: 'userData',
        render: function (text, record) {
          return <li key={record._id}>{JSON.stringify(record, text)}</li>;
        },
      },
    ];
    
  
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('http://localhost:9000/auth/users', {
          withCredentials: true,
        });
  
        setUserData(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // The empty dependency array ensures that fetchData runs only once when the component mounts
  
    if (!authenticated) {
      // Redirect to the login page if not authenticated
      return <Link to="/signin" />;
    }
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          {/* User Table */}
          <h2>All Users</h2>
          <Table dataSource={userData} columns={userColumns} className='text-black' />
        </Content>
      </Layout>
    );
  };
  
  export default AdminPanel;
