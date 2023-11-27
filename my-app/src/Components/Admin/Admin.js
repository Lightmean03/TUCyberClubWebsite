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
    // Columns for the user table
    const userColumns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
    ];
  
    // Columns for the admin table
    const adminColumns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type="link" onClick={() => showModal(record)}>
            Grant Permission
          </Button>
        ),
      },
    ];
  
    // Modal form layout
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
  
    // Show modal for granting permissions
    const showModal = (record) => {
      form.setFieldsValue(record);
      setIsModalVisible(true);
    };
  
    // Handle form submission
    const handleOk = () => {
      form.validateFields()
        .then((values) => {
          console.log('Success:', values);
  
          // Simulate an API call to grant permissions
          axios
            .post('http://localhost:9000/api/grant-permission', {
              adminId: values.id,
              // Add other necessary data for the API call
            })
            .then((response) => {
              console.log('Permissions granted successfully:', response.data);
              message.success('Permissions granted successfully');
              setIsModalVisible(false);
            })
            .catch((error) => {
              console.error('Error granting permissions:', error);
              message.error('Failed to grant permissions');
            });
        })
        .catch((errorInfo) => {
          console.log('Failed:', errorInfo);
        });
    };
  
    // Handle form cancel
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  

  if (!authenticated) {
    // Redirect to the login page if not authenticated
    return <Link to="/signin" />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        {/* Add your header content here */}
      </Header>
      <Content style={{ margin: '16px' }}>
        {/* User Table */}
        <h2>All Users</h2>
        <Table dataSource={userData} columns={userColumns} />

        {/* Admin Table */}
        <h2>Admins</h2>
        <Table dataSource={adminData} columns={adminColumns} />

        {/* Grant Permission Modal */}
        <Modal
          title="Grant Permission"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} {...layout}>
            <Form.Item label="ID" name="id">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
          </Form>
        </Modal>

        <button onClick={handleSignOut}>
          <LogoutOutlined />
          Sign Out
        </button>
      </Content>
    </Layout>
  );
};


export default AdminPanel;
