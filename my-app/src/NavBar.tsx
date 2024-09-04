import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import React, { useState } from "react";
import { useAuthStore } from "./utils/authStore";

export default function Navbar({ logo }: { logo?: string }) {
  const navigate = useNavigate();
  const { user, handleSignOut } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  
  const handleLogout = async () => {
    try {
      handleSignOut();
      navigate("/home");
      setShowMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const Admin = user && user.role === 'admin';

  return (
    <div className="navbar bg-gold text-black">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={handleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          {showMenu && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gold rounded-box w-52 text-white">
              <li className="hover:bg-white hover:text-gold">
                <Link to="/home" onClick={closeMenu}>Home</Link>
              </li>
              <li className="hover:bg-white hover:text-gold">
                <Link to="/about" onClick={closeMenu}>About</Link>
              </li>
              <li className="hover:bg-white hover:text-gold">
                <Link to="/news" onClick={closeMenu}>News</Link>
              </li>
              <li className="hover:bg-white hover:text-gold">
                <Link to="/resources" onClick={closeMenu}>Resources</Link>
              </li>
              <li className="hover:bg-white hover:text-gold">
                <Link to="/scoreboard" onClick={closeMenu}>Scoreboard</Link>
              </li>
              <li className="hover:bg-white hover:text-gold">
                <Link to="/attendance" onClick={closeMenu}>Attendance</Link>
              </li>
            </ul>
          )}
        </div>
        <Link to="/home" className="btn btn-ghost normal-case text-xl">CyberClub</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/scoreboard">Scoreboard</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={handleMenu}>
              <div className="w-10 rounded-full">
                <FaRegUser className="w-6 h-6 m-2" />
              </div>
            </label>
            { handleMenu&& ( 
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black rounded-box w-52">
                <div className="text-white">
                  <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                  {Admin && <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>}
                  <li><button onClick={handleLogout}>Logout
                  </button>
                  </li>
                </div>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/signin" className="btn btn-ghost btn-circle">
            <FaRegUser className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}