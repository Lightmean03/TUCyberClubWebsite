import React from 'react';
import './Footer.css';
import {  FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';


export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-social">
            <a href="https://discord.gg/8X6YQU8N9P" className="footer-social-link">
              <FaDiscord className="footer-social-icon" />
            </a>
            <a href="/" className="footer-social-link">
              <FaTwitter className="footer-social-icon" />
            </a>
            <a href="/" className="footer-social-link">
              <FaInstagram className="footer-social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-section">
          
          <h5 className="footer-heading">Towson CyberClub</h5>
          <ul className="footer-list">
            <li>
              <a href="/Resources">Resources</a>
            </li>
            <li>
              <a href="/About">About Us</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h5 className="footer-heading">Help</h5>
          <ul className="footer-list">
          <li>
              <a href="/Home">Home</a>
            </li>
            <li>
            <a href="/Signin">Sign In</a>
            </li>
            <li>
              <a href="/Signup">Sign Up</a>
            </li>
            
          </ul>
        </div>
        <div className="footer-section">
          <h5 className="footer-heading">Mailing Address</h5>
          <ul className="footer-list">
            <li>
            <h3>7800 York Road Towson, MD 21252</h3>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

