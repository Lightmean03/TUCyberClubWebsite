import React, { useState } from 'react';
import './Resources.css';
import Cyber1 from '../Images/CyberResource_1.jpg';
import Cyber2 from '../Images/cqlogo.png';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function Resources() {
  const images = [Cyber1, Cyber2]; // Add more image URLs here if needed
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
        <div className='click-through-container' onClick={handleRightArrowClick}>
          <img src={images[currentIndex]} loading="lazy" alt="Group" className="cyber-image" />
        </div>
        <div className='arrow-container' onClick={handleRightArrowClick}>
          <AiOutlineArrowRight className="arrow-icon" />
        </div>
      </section>
    </div>
  );
}
