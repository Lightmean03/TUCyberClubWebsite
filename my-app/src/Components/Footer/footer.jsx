import React from "react";
import "./Footer.css";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="text-base-content">
    <div className="footer footer-center p-10 bg-gold">
        <nav className="grid grid-flow-col gap-6">
        <a
              href="https://discord.gg/8X6YQU8N9P"
              className="footer-social-link"
            >
              <FaDiscord className="footer-social-icon" />
            </a>
            <a href="/" className="footer-social-link">
              <FaTwitter className="footer-social-icon" />
            </a>
            <a href="/" className="footer-social-link">
              <FaInstagram className="footer-social-icon" />
            </a>
        </nav>

        <nav>
            <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-lg">
                <a className="link link-hover" href="/Home">Home</a>
                <a className="link link-hover" href="/Signin">Sign In</a>
                <a className="link link-hover" href="/About">About</a>
            </div>
        </nav>
    <aside className="py-4 px-8 w-full flex gap-2 flex-wrap justify-between items-center text-sm">
        <p className="text-xl flex items-center gap-2">
            <span>Towson Cyber Club</span>
        </p>
        <p>Copyright © 2024 - All rights reserved</p>
    </aside>
    </div>
  </footer>
  );
};

