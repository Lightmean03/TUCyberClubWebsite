import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Navbar from './NavBar';
import Resources from './Components/Resources';
import News from './Components/News';
import Contact from './Components/Contact';
import SignUp from './Components/Signup'; // Import the SignUp component

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
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Signup" element={<SignUp />} /> {/* Add the element prop */}
        </Routes>
      </div>
    </>
  );
}

export default App;

