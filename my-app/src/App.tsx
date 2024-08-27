import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Signin from "./Components/Signin/Signin";
import Resources from "./Components/Resources/Resources";
import News from "./Components/News/News";
import Signup from "./Components/Signup/Signup";
import Layout from "./Components/Layout";
import { Footer } from "./components/Footer/footer";
import AdminPanel from "./Components/Admin/Admin";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import PostList from "./Components/Scoreboard/PostList";
import Attendance from "./Components/Attendence/Attendance";
import { useAuthStore } from "./utils/authStore";
import { useEffect } from "react";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <Signin />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          {
            <Route
              path="/news"
              element={
                <Layout>
                  <News />
                </Layout>
              }
            />
          }
          <Route
            path="/resources"
            element={
              <Layout>
                <Resources />
              </Layout>
            }
          />
          
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="/attendance"
            element={
              <Layout>
                <Attendance />
              </Layout>
            }
          />
          <Route
            path="/posts"
            element={
              <Layout>
                <PostList />
              </Layout>
            }
          />
          <Route element={
            <Layout>
          <ProtectedRoute />
          </Layout>}>
          <Route path="/dashboard" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scoreboard" element={<PostList />}/>
          </Route>
        </Routes>
        <Footer />
      </>
  );
}

export default App;
