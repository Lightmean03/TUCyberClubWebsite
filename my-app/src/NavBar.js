import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from './Components/Image';
import { VscMenu } from 'react-icons/vsc';

export default function Navbar({ logo }) {
  return (
    <>
      <Link to="/Home" className="site-title">
        <ImageComponent src={logo} alt="Logo" className="logo" />
      </Link>
      <nav className="nav">
      <ul>
          <CustomLinkWithHoverableDropdown label={<VscMenu />} >
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/signin">Sign-In</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/news">News</CustomLink>
            <CustomLink to="/resources">Resources</CustomLink>
            <CustomLink to="/contact">Contact</CustomLink>
          </CustomLinkWithHoverableDropdown>
        </ul>
      </nav>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
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
