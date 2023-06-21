import React from 'react';
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Navbar from './NavBar';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
