import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../utils/authContext";
import axios from "axios";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../utils/authStore";
import Cookies from "js-cookie";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const { user, token } = useAuth();
  const { refreshAccessToken } = useAuthStore();
  const navigate = useNavigate();

  const fetchUsers = async (token: string) => {
    const csrfToken = Cookies.get("csrftoken");
    return axios.get(`${API_URL}/api/users/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": csrfToken,
      },
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      if (user && user.role === "admin" && token) {
        try {
          const response = await fetchUsers(token);
          setUserList(response.data.users);
        } catch (error) {
          console.error("Error fetching users:", error);
          if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            const newToken = useAuthStore.getState().token;
            try {
              const response = await fetchUsers(newToken);
              setUserList(response.data);
            } catch (retryError) {
              console.error("Error fetching users after token refresh:", retryError);
              navigate("/signin");
            }
          }
        }
      } else {
        navigate("/signin");
      }
    };

    getUsers();
  }, [user, token, refreshAccessToken, navigate]);

  const userColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
  ];

  if (!user || !token) {
    navigate("/signin");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="bg-gray-900">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0, backgroundColor: "#d29b04", color: "#fff" }}
        >
          <SubMenu
            key="sub1"
            icon={<UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            title="User Data"
          >
            <Menu.Item key="1" className="hover:bg-black text-white">
              Users
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="ml-200">
        <Content className="p-4">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Admin Panel</Breadcrumb.Item>
          </Breadcrumb>
          <Table
            columns={userColumns}
            dataSource={userList}
            rowKey="id"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
