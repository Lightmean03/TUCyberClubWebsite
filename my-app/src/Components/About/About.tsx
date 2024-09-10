import React, {useState} from "react";
import "./About.css";
import clubmeeting from "@/assets/clubmeeting2021.jpg";
import loyala from "@/assets/loyala.jpg";
import tuClub from "@/assets/tuCLUBBG3.jpg";
import cptc from "@/assets/cptc.jpg"
import maccdc from "@/assets/maccdc.jpg"
import cybermaryland from "@/assets/cybermaryland.jpg"
import maccdc2014 from "@/assets/maccdc_2014.jpg"
import Meeting2024 from "@/assets/1st_CyberMeet_2024.jpg"
import Meeting2024_2 from "@/assets/2st_CyberMeet_2024.jpg"
import Meeting2024_3 from "@/assets/3st_CyberMeet_2024.jpg"
import Meeting2024_4 from "@/assets/4st_CyberMeet_2024.jpg"
import Meeting2024_5 from "@/assets/5st_CyberMeet_2024.jpg"

import { FaEnvelope, FaDiscord } from 'react-icons/fa';


export default function About() {
  const [aboutVisible, setAboutVisible] = useState(6);
  const images = [
    { src: clubmeeting, alt: "Club Meeting", title: "Club Meeting" },
    { src: loyala, alt: "Loyola Event", title: "Loyola Event" },
    { src: cptc, alt: "CPTC", title: "CPTC" },
    { src: maccdc, alt: "Mid-Atlantic Collegiate Cyber Defense Competition", title: "Mid-Atlantic Collegiate Cyber Defense Competition" },
    { src: cybermaryland, alt: "Cyber Maryland", title: "Cyber Maryland" },
    { src: maccdc2014, alt: "Mid-Atlantic Collegiate Cyber Defense Competition 2014", title: "Mid-Atlantic Collegiate Cyber Defense Competition 2014" },
    { src: Meeting2024, alt: "First CyberMeet of 2024", title: "First CyberMeet of 2024" },
    { src: Meeting2024_2, alt: "Second CyberMeet of 2024", title: "Second CyberMeet of 2024" },
    { src: Meeting2024_3, alt: "Third CyberMeet of 2024", title: "Third CyberMeet of 2024" },
    { src: Meeting2024_4, alt: "Fourth CyberMeet of 2024", title: "Fourth CyberMeet of 2024" },
    { src: Meeting2024_5, alt: "Fifth CyberMeet of 2024", title: "Fifth CyberMeet of 2024" },
  ];

  const handleShowMore = () => {
    setAboutVisible(prevCount => Math.min(prevCount + 6, images.length));
  };

  const handleShowLess = () => {
    setAboutVisible(prevCount => Math.max(prevCount - 6, 6));
  };


  return (
    <div className="relative font-sans min-h-screen bg-white text-black flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-full flex justify-center">
        <img src={tuClub} alt="tuClub" className="h-[432px] w-full object-cover"/>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-6xl text-white text-center">
          About Our Cyber Club
        </h1>
      </div>
  
      {/* Introduction Section */}
      <section className="mt-12 w-full max-w-6xl px-6">
        <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-xl font-sans font-normal leading-8 text-black text-center mb-12">
          The Towson Cyber Defense Club is dedicated to fostering a community of cybersecurity enthusiasts. 
          Our mission is to provide a platform for students to explore, learn, and excel in the field of cybersecurity. 
          We aim to bridge the gap between academic knowledge and real-world applications, preparing our members for successful careers in this dynamic field.
        </p>
<h3>Join the discord to stay informed: <a href="https://discord.gg/jmR4gysYxB" target="_blank">https://discord.gg/jmR4gysYxB</a></h3>
      </section>
  
      {/* Activities and Events Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">Activities and Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Weekly Meetings</h3>
              <p>Every Wednesdays at 5pm, and every Friday at 4pm. in the cyber center room 364</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Guest Speakers</h3>
              <p>Industry professionals regularly share insights and experiences with our members.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Competitions</h3>
              <p>We participate in CCDC, CPTC,NCL,HIVESTORM and other national cybersecurity competitions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Networking Events</h3>
              <p>Connect with alumni and industry partners at our semi-annual networking mixers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl px-6 my-16 mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Club Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.slice(0, aboutVisible).map((image, index) => (
            <div key={index} className="relative group">
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <span className="text-white text-2xl font-semibold text-center">{image.title}</span>
              </div>
            </div>
          ))}
        </div>
        {aboutVisible < images.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 btn btn-primary text-white rounded-lg hover:bg-amber-400 transition-colors"
            >
              Show More
            </button>
            
          </div>
        )}
        {aboutVisible > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowLess}
              className="px-4 py-2 btn btn-primary text-white rounded-lg hover:bg-amber-400 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </section>
      

      {/* Join Us Section */}
      <section className="w-full bg-gold py-24">
        <h2 className="text-3xl font-sans font-bold leading-tight tracking-normal text-center text-black max-w-4xl mx-auto px-6">
          Join us for our weekly meetings to learn about cyber security and participate in hands-on labs. 
          We welcome students of all skill levels and backgrounds.
        </h2>
      </section>
  
      {/* History Section */}
      <section className="w-full max-w-6xl px-6 my-16">
        <h2 className="font-bold text-black text-4xl mb-8 text-center">Our History</h2>
        <div className="space-y-8 text-black">
          <p className="text-lg leading-7">
            Towson Cyber Defense Club has a rich history that dates back to
            2006. Under the leadership of Coach Mike O'Leary since then, the
            club has achieved significant milestones, including multiple
            successful participations in regional and national competitions.
            The club's commitment to cybersecurity education and hands-on
            experience has made it a prominent force in the cybersecurity
            community at Towson University.
          </p>
          <p className="text-lg leading-7">
            Over the years, our club has grown from a small group of enthusiasts to a thriving community of over 100 active members. We've consistently placed in the top 10 at the National Collegiate Cyber Defense Competition (NCCDC) and have won the Mid-Atlantic CCDC three times. Our alumni have gone on to work for leading tech companies and government agencies, solidifying our reputation as a breeding ground for cybersecurity talent.
          </p>
        </div>
      </section>

      {/* Team/Leadership Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-2">Mike O'Leary</h3>
              <p className="text-primary font-medium mb-4">Faculty Advisor</p>
              <p>Guiding the club since 2006 with expertise in network security and cryptography.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-2">Kaden Pirmohamed</h3>
              <p className="text-primary font-medium mb-4">Club President</p>
              <p>Junior cybersecurity major with a focus on penetration testing and ethical hacking.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-2">Josh Kimmel</h3>
              <p className="text-primary font-medium mb-4">Vice President</p>
              <p>Junior Information Technology major interest in networking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="w-full max-w-6xl px-6 my-16">
        <h2 className="text-4xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="text-center">
          <p className="text-lg mb-4">Have questions or want to join? Reach out to us!</p>
          <p className="text-lg mb-4">Email: cyberclub@towson.edu</p>
          <p className="text-lg mb-8">Meeting Location: Cyber Center, Room 364</p>
          <div className="flex justify-center space-x-6">
            <a href="https://discord.gg/XM85TkNXbS" className="text-primary hover:text-primary-dark transition-colors">
              <FaDiscord size={24} />
            </a>
            <a href="mailto:cyberclub@towson.edu" className="text-primary hover:text-primary-dark transition-colors">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
