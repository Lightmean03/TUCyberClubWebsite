import React, { useState } from 'react';
import './Resources.css';
import Cyber1 from '../Images/pico.png';
import Cyber2 from '../Images/pwn.png';
import Cyber3 from '../Images/Sql.png';
import Cyber4 from '../Images/HackTheBox.png';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function Resources() {
  const images = [Cyber1, Cyber2, Cyber3, Cyber4]; // Add more image URLs here if needed
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className='resource-container'>
      <h1 className="title">Resources</h1>
      <p className="p-text">Resources used to make you a better hacker</p>

      <section className='resource-content'>
        <div className='arrow-container' onClick={handleLeftArrowClick}>
          <AiOutlineArrowLeft className="arrow-icon" />
        </div>

        <div className="box-container">
          <a href="https://picoctf.org/" target="_blank" rel="noopener noreferrer">
            <div
              className={`cyber-image ${currentIndex === 0 ? 'active' : ''}`}
              style={{ backgroundImage: `url(${images[0]})` }}
            >
          </div>
          </a>
          <a href="https://pwn.college/" target="_blank" rel="noopener noreferrer">
          <div
            className={`cyber-image ${currentIndex === 1 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${images[1]})` }}
          >
          </div>
          </a>
          
        <a href="https://www.codecademy.com/learn/learn-sql" target="_blank" rel="noopener noreferrer">
        <div 
          className={`cyber-image ${currentIndex === 2 ? 'active' : ''}`}
          style={{ backgroundImage: `url(${images[2]})` }}
            >
        </div>
        </a>
        <a href="https://www.hackthebox.com/" target="_blank" rel="noopener noreferrer">
        <div 
          className={`cyber-image ${currentIndex === 3 ? 'active' : ''}`}
          style={{ backgroundImage: `url(${images[3]})` }}
            >

        </div>
        </a>
        <div className='arrow-container' onClick={handleRightArrowClick}>
          <AiOutlineArrowRight className="arrow-icon" />
        </div>
        </div>
      </section>
    </div>
  );
}
