import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ logo }) {
  return (
    <nav className="flex justify-between px-2 py-4 flex-row items-center z-0 bg-[#E8B019] mb-10">

      <span className="items-center flex -mt-24">
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
