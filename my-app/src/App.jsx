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
import Post from "./Components/Post/Post";
import Profile from "./Components/Profile/Profile";
import createAppStore from "./redux/store";
import {useEffect, useState} from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const createdStore = await createAppStore();
        setStore(createdStore);
      } catch (error) {
        console.error("Error initializing the store:", error);
      }
    };

    initializeStore();
  }, []);

  if (!store) {
    // If store is not yet initialized, you might want to render a loading indicator
    return <div>Loading...</div>;
  }
  return (
    <Provider store={store}>
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
          path="/post"
          element={
            <Layout>
              <Post />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <AdminPanel />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
      <Footer />
    </>
    </Provider>
  );
}

export default App;
