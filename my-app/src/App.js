// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Signin from "./Components/Signin/Signin";
import Resources from "./Components/Resources/Resources";
import News from "./Components/News/News";
import Contact from "./Components/Contact/Contact";
import Signup from "./Components/Signup/Signup";
import Layout from "./Components/Layout";
import { Footer } from "./Components/Footer/footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminPanel from "./Components/Admin/Admin";
import NewHome from "./Components/Home/NewHome";
import UserList from "./Components/Admin/UserList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <Layout>
              <NewHome />
            </Layout>
          }
        />
        <Route
          path="/oldhome"
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
          path="/contact"
          element={
            <Layout>
              <Contact />
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
          path="/dashboard/*"
          element={
            <Layout>
              <AdminPanel />
            </Layout>
          }
        />
         <Route
          path="/users"
          element={
            <Layout>
              <UserList />
            </Layout>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
