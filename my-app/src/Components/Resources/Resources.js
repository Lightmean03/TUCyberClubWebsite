import React, { useState } from 'react';
import Cyber1 from '../Images/pico.png';
import Cyber2 from '../Images/pwn.png';
import Cyber3 from '../Images/Sql.png';
import Cyber4 from '../Images/HackTheBox.png';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function Resources() {
  const images = [Cyber1, Cyber2, Cyber3, Cyber4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="resource-container flex flex-col justify-center items-center min-h-screen p-8 text-center">
      <h1 className="title text-6xl font-bold relative z-10 mb-20">Resources</h1>
      <p className="p-text text-2xl font-normal relative bottom-36 right-72"></p>

      <section className="resource-content flex relative justify-center items-center flex-row p-2">
        <div className="arrow-container flex justify-center items-center p-8 cursor-pointer" onClick={handleLeftArrowClick}>
          <AiOutlineArrowLeft className="arrow-icon text-5xl" />
        </div>

        <div className="box-container flex items-center space-x-4">
          {images.map((image, index) => (
            <a
              key={index}
              href={
                index === 0
                  ? 'https://picoctf.org/'
                  : index === 1
                  ? 'https://pwn.college/'
                  : index === 2
                  ? 'https://www.codecademy.com/learn/learn-sql'
                  : 'https://www.hackthebox.com/'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`cyber-image ${currentIndex === index ? 'active' : ''} `}
              style={{ backgroundImage: `url(${image}) `, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
            >
              <div className="overlay flex justify-center items-center h-69 w-69">
                Cyber {index + 1}
              </div>
            </a>
          ))}
        </div>

        <div className="arrow-container flex justify-center items-center p-8 cursor-pointer" onClick={handleRightArrowClick}>
          <AiOutlineArrowRight className="arrow-icon text-5xl" />
        </div>
        
      </section>
    </div>
  );
}
