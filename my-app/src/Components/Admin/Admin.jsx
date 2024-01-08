import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUsers} from '../../redux/actions/userActions';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [authenticated, setAuthenticated] = useState(true);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();

  const userLoggedIn = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = cookies.token;
        const response = await axios.get("http://localhost:9000/auth/admin", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const data = response.data;
        setAuthenticated(true);
        dispatch(userLoggedIn(data)); // Dispatch as an action
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        setAuthenticated(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const { error, data: userResponse } =  getUsers();
        if (!error) {
          setUserList(userResponse.data);
        } else {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdminInfo();
    fetchUserData();
  }, [cookies.token, dispatch, userLoggedIn]);

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