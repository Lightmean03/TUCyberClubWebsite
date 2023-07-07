// App.js
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
import Signup from './Components/Signup';
import Layout from './Components/Layout';
import { Footer } from './Components/footer';
import Curveys from './Components/Curveys';
import ImageComponent from './Components/Image';
import logoImg from './Images/Logo.png';
import Dashboard from './Components/Dashboard';
import { CircleGrid } from 'react-awesome-shapes/dist/shapes/circlegrid';
import { Donut } from 'react-awesome-shapes/dist/shapes/donut';
function App() {
  return (
    <>
   <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '100px' }}>
  <CircleGrid
    color="rgb(255, 255, 255)"
    size="150px"
    zIndex={2}
    style={{ opacity: 0.8, borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
  />
</div>
<Donut
  color="rgba(255, 255, 255, 0.83)"
  size="140px"
  width={['20px', '20px', '40px', '40px']}
  zIndex={2}
  style={{ opacity: 0.9, borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
/>


      <Curveys />
      <Navbar logo={logoImg} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/signin" element={<Layout><Signin /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
