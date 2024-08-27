import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../utils/authContext";
import axios from "axios";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../utils/authStore";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [userList, setUserList] = useState([]);
  const { user, token } = useAuth();
  const { refreshAccessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      if (user && user.role === 'admin' && token) {
        try {
          const response = await fetchUsers(token);
          setUserList(response.data.users);
        } catch (error) {
          console.error('Error fetching users:', error);
          if (error.response && error.response.status === 401) {
            try {
              await refreshAccessToken();
              const newToken = localStorage.getItem('token');
              if (newToken) {
                const response = await fetchUsers(newToken);
                setUserList(response.data.users);
              } else {
                navigate('/signin');
              }
            } catch (refreshError) {
              console.error('Error refreshing token:', refreshError);
              navigate('/signin');
            }
          } else {
            navigate('/signin');
          }
        }
      } else {
        navigate('/signin');
      }
    };
    
    const fetchUsers = async (token) => {
      return axios.get(`${API_URL}/api/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
    };

    getUsers();
  }, [user, token, refreshAccessToken, navigate]);

  const userColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (id) => `${id}`
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => `${email}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => `${role}`,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username) => `${username}`,
    },
  ];

  if (!user || !token) {
    return <Link to="/signin" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider width={200} className="bg-gray-900">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="User Data">
              <Menu.Item key="1">Users</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="ml-200">
          <Content className="p-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb items={[{ title: "Home" }]} />
              <Breadcrumb items={[{ title: "Admin Panel" }]} className="pl-4" />
            </Breadcrumb>
            <Table
              columns={userColumns}
              dataSource={userList}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;