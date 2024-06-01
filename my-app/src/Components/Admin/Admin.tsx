import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../utils/authContext";
import axios from "axios";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [userList, setUserList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const isAdmin = () => {
      if (user.role === 'admin') {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    const getUsers = async () => {
      if (authenticated) {
        try {
          const token = user.access;
          const response = await axios.get(`${API_URL}/api/users/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          setUserList(response.data.users);
        } catch (error) {
          console.error(error);
        }
      }
    };

    isAdmin();
    getUsers();
  }, [authenticated, user]);

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

  if (!authenticated) {
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