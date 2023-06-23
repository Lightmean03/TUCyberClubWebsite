import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Navbar from './NavBar';
import Resources from './Components/Resources';
import News from './Components/News';
import Contact from './Components/Contact'; // Import the Contact component

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/about" element={<About />} />
          <Route path="/News" element={<News />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/Contact" element={<Contact />} /> {/* Add the Contact route */}
          
        </Routes>
      </div>
    </>
  );
}

export default App;
