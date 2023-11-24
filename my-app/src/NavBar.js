import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useUser } from '../src/Components/Signin/UserContext';
import axios from 'axios';
import { FaRegUser } from 'react-icons/fa';

export default function Navbar({ logo }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userLoggedIn, logout } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9000/auth/signout'); 
      logout();
      Navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="flex justify-between px-4 py-4 flex-row items-center z-0 bg-[#E8B019] mb-10">

       <span className="items-center hidden md:flex -mt-24">
        <img src={logo} alt="Logo" className="h-28 w-28 bg-white rounded-xl border" />
      </span>
      <div className="hidden md:flex space-x-4 pl-2">
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/news">News</CustomLink>
        <CustomLink to="/resources">Resources</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </div>
      <div className="flex items-center justify-end ml-auto space-x-4">
                    {userLoggedIn ? (
                        <UserDropdown user={userLoggedIn} onLogout={handleLogout} />
                    ) : (
                        <Link to="/signin" className="flex items-center space-x-2">
                            <FaRegUser className="text-gray-500" />
                            <span className="text-sm font-medium">Sign In</span>
                        </Link>
                    )}
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

const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="relative z-1">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
              <span className="text-sm font-medium">{user.name}</span>
              <FaRegUser className="text-gray-500" />
          </button>
          {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-30">
                  <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black overflow-auto">
                          Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black  overflow-auto" onClick={onLogout}>
                          Logout
                      </li>
                      <li  className="px-4 py-2 hover:bg-gray-100 cursor-pointer overflow-auto text-black" >
                        <CustomLink to="/dashboard">Dashboard</CustomLink>                         
                      </li>

                  </ul>
              </div>
          )}
      </div>
  );

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

};
