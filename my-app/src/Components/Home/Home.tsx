import React from "react";
import { useState } from "react";
import bg1 from "@/assets/tuCLUBBG3.jpg";
import bg2 from "@/assets/tuBg.jpeg";
import "./animation.css";


export default function NewHome() {
  const [aboutVisible, setAboutVisible] = useState(false);

  const handleAboutClick = () => {
    setAboutVisible(!aboutVisible);
  };
  const sectionStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  };

  return (
      <>
      <section
        style={{ ...sectionStyle, backgroundImage: `url(${bg1})` }}
        className={`relative h-screen flex items-center justify-center bg-blue-500 text-white ${
          aboutVisible ? "fade-in" : ""
        }`}
        id="about-section"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4 color ">About Us</h2>
          <p className="text-lg mb-8">
            Learn more about our Cyber Defense Club
          </p>
          <a
            href="about"
            onClick={handleAboutClick}
            className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700 hover:text-white"
          >
            Explore
          </a>
        </div>
      </section>

      {/* About Us Section 2 */}
      <section
        style={{ ...sectionStyle, backgroundImage: `url(${bg2})` }}
        className={`relative h-screen flex items-center justify-center bg-blue-500 text-white ${
          aboutVisible ? "fade-in" : ""
        }`}
        id="about-section"
      >
        <div className="text-center">
          <h2 className="text-4xl mb-4 font-extrabold">Towson</h2>
          <p className="text-lg mb-8">Learn more about Towson University</p>
          <a
            href="https://www.towson.edu/"
            onClick={handleAboutClick}
            className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700 hover:text-white"
          >
            Explore
          </a>
        </div>
      </section>
      </>
  );
}
