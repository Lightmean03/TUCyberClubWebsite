import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import React from "react";
import axios from "axios";
import { useUser } from "./utils/userContext";
import { API_URL } from "./lib/constants";

export default function Navbar({ logo }: { logo?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  console.log("user", user);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      axios.post(`${API_URL}/auth/signout`,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <nav className="px-4 py-4 flex-row items-center z-0 bg-[#E8B019] mb-1">
      <div className="flex-grow flex items-center justify-between">
        <div className="hidden md:flex space-x-4 pl-2 text-black font-sans font-medium ">
          <CustomLink href="/home">Home</CustomLink>
          <CustomLink href="/about">About</CustomLink>
          <CustomLink href="/news">News</CustomLink>
          <CustomLink href="/resources">Resources</CustomLink>
          <CustomLink href="/contact">Contact</CustomLink>
          <CustomLink href="/post">Post</CustomLink>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <UserDropdown
              user={user.name}
              onLogout={handleLogout}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          ) : (
            <CustomLink href="/signin">
              <FaRegUser className="text-gray-500" />
            </CustomLink>
          )}

          <button onClick={toggleMobileMenu} className="md:hidden text-white">
            {isMobileMenuOpen ? <IoMdClose /> : <FaBars />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 justify-center items-center">
          <CustomLink href="/home" className="hover:bg-black">
            Home
          </CustomLink>
          <CustomLink href="/signin" className="hover:bg-black">
            Sign-In
          </CustomLink>
          <CustomLink href="/about" className="hover:bg-black">
            About
          </CustomLink>
          <CustomLink href="/news" className="hover:bg-black">
            News
          </CustomLink>
          <CustomLink href="/resources" className="hover:bg-black">
            Resources
          </CustomLink>
          <CustomLink href="/contact" className="hover:bg-black">
            Contact
          </CustomLink>
          <CustomLink href="/post" className="hover:bg-black">
            Post
          </CustomLink>
        </div>
      )}
    </nav>
  );
}

const CustomLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href, ...props }, ref) => (
  <Link to={href as string} ref={ref} {...props}>
    {props.children}
  </Link>
));


const UserDropdown = ({
  onLogout,
  isMobileMenuOpen,
  user,
}: {
  user: any;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("mobile", isMobileMenuOpen);
  console.log("open", isOpen);

  return (
    <div className="relative z-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <span className="text-sm font-medium">{user?.name}</span>
        <FaRegUser className="text-gray-500" />
      </button>
      {isOpen && (
        <div
          className={`absolute mt-2 w-48 min-w-0 max-w-screen bg-white border border-gray-300 rounded-md shadow-lg z-30 
          ${isMobileMenuOpen && isOpen ? "left-0" : "right-0"}
          `}
        >
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black overflow-auto">
              <CustomLink href="/profile">Profile</CustomLink>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black  overflow-auto"
              onClick={onLogout}
            >
              Logout
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer overflow-auto text-black">
              <CustomLink href="/dashboard">Dashboard</CustomLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

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

