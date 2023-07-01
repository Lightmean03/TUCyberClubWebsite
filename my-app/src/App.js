import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Navbar from './NavBar';
import Resources from './Components/Resources';
import News from './Components/News';
import Contact from './Components/Contact';
import SignUp from './Components/Signup';
import Layout from './Components/Layout';
import { Footer } from './Components/footer';
import Curveys from './Components/Curveys';
import User from './Components/User';
function App() {
  
  return (
    <>
    
      <Curveys />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />} // Redirect from "/" to "/home"
        />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/signin" element={<Layout><Signin /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
      </Routes>
      <Footer/>
      </>
  );
}

export default App;
