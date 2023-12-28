import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useUser } from "../Signin/UserContext";
import { API_URL } from "../../lib/constants";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const { setUserLoggedIn } = useUser();
  const [authenticated, setAuthenticated] = useState(true);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const AdminInfo = async () => {
      try {
        const token = cookies.token;
        const response = await axios.get(`${API_URL}/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const data = response.data;
        setAuthenticated(true);
        setUserLoggedIn(data);
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        setAuthenticated(false);
        //setUserLoggedIn(false);
      }
    };

    AdminInfo();
  }, []);

  const UserData = async () => {
    try {
      const userResponse = await axios.get(`${API_URL}/auth/users`, {
        withCredentials: true,
      });
      setUserData(userResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const userColumns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => `${_id}`,
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
  ];

  useEffect(() => {
    UserData();
  }, []);

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
            <Table dataSource={userData} columns={userColumns} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
