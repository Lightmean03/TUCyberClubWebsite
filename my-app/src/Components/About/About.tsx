import React from "react";
import "./About.css";
import clubmeeting from "@/assets/clubmeeting2021.jpg";
import loyala from "@/assets/loyala.jpg";
import tuClub from "@/assets/tuCLUBBG3.jpg";
import cptc from "@/assets/cptc.jpg"
import maccdc from "@/assets/maccdc.jpg"
import cybermaryland from "@/assets/cybermaryland.jpg"
import maccdc2014 from "@/assets/maccdc_2014.jpg"




import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function About() {
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
      </section>
  
      {/* Activities and Events Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">Activities and Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Weekly Meetings</h3>
              <p>Every Thursday, we host hands-on workshops covering various cybersecurity topics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Guest Speakers</h3>
              <p>Industry professionals regularly share insights and experiences with our members.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Competitions</h3>
              <p>We participate in CCDC, CPTC, and other national cybersecurity competitions.</p>
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
    
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={clubmeeting} alt="clubmeeting" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-white text-xl font-semibold">Club Meeting</span>
      </div>
    </div>
    
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={loyala} alt="loyala" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-white text-xl font-semibold">Loyola Event</span>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={cptc} alt="loyala" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-white text-xl font-semibold">CPTC</span>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={maccdc} alt="loyala" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-white text-xl font-semibold">Mid-Atlantic Collegiate Cyber Defense Competition</span>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={cybermaryland} alt="loyala" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-white text-xl font-semibold">Cyber Maryland</span>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={maccdc2014} alt="loyala" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-white text-xl font-semibold">Mid-Atlantic Collegiate Cyber Defense Competition 2014</span>
      </div>
    </div>
    
    
  </div>
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
              <h3 className="text-2xl font-semibold mb-2">Kaden</h3>
              <p className="text-primary font-medium mb-4">Club President</p>
              <p>Senior cybersecurity major with a focus on penetration testing and ethical hacking.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-2"></h3>
              <p className="text-primary font-medium mb-4">Vice President</p>
              <p>Junior computer science major specializing in malware analysis and reverse engineering.</p>
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
          <p className="text-lg mb-8">Meeting Location: Cook Library, Room 404</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-primary hover:text-primary-dark transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-primary hover:text-primary-dark transition-colors">
              <FaTwitter size={24} />
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