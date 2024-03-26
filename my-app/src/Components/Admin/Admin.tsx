import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL } from "../../lib/constants";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [authenticated, setAuthenticated] = useState(true);
  const [userList, setUserList] = useState([]);
  const token = cookies.token;



  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = cookies.token;
        const response = await axios.get(`/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const data = response.data;
        console.log("data", data);
        setAuthenticated(true);
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        setAuthenticated(false);
      }
    };

    const fetchUserData = async (token: any) => {
      try {
        const response = await axios.get(`/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const data = response.data;
        setUserList(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdminInfo();
    fetchUserData(token);
  }, []);

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
            <Table dataSource={userList} columns={userColumns} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;