// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Navbar from './NavBar';
import Resources from './Components/Resources/Resources';
import News from './Components/News/News';
import Contact from './Components/Contact/Contact';
import Signup from './Components/Signup/Signup';
import Layout from './Components/Layout';
import { Footer } from './Components/Footer/footer';
import Curveys from './Components/Curvey/Curveys';
import logoImg from './Components/Images/Logo.png';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminPanel from './Components/Admin/Admin';
function App() {
  return (
    <>

    <div className='shooting-star'></div>

      <Curveys /> 
      <Navbar logo={logoImg} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/signin" element={<Layout><Signin /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        {<Route path="/news" element={<Layout><News /></Layout>} />}
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/dashboard" element={<Layout><AdminPanel /></Layout>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
