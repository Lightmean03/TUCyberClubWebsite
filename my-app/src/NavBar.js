import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


export default function Navbar({ logo }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex justify-between px-4 py-4 flex-row items-center z-0 bg-[#E8B019] mb-10">

       <span className="items-center hidden md:flex -mt-24">
        <img src={logo} alt="Logo" className="h-28 w-28 bg-white rounded-xl border" />
      </span>
      <div className="hidden md:flex space-x-4">
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/signin">Sign-In</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/news">News</CustomLink>
        <CustomLink to="/resources">Resources</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </div>

  
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <IoMdClose/> : <FaBars />}
        </button>
        {isMobileMenuOpen && (
          <div className="flex flex-row space-x-3 mt-4 mb-4">
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/signin">Sign-In</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/news">News</CustomLink>
            <CustomLink to="/resources">Resources</CustomLink>
            <CustomLink to="/contact">Contact</CustomLink>
          </div>
        )}
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}

function CustomLinkWithHoverableDropdown({ label, children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!isDropdownOpen && (
        <button className="btn dropdown-label">{label}</button>
      )}
      {isDropdownOpen && <ul className="submenu">{children}</ul>}
    </li>
  );
}
