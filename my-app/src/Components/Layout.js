import React, { useEffect } from "react";

import Curveys from "./Curvey/Curveys";
import logoImg from "./Images/Logo.png";
import Navbar from "../NavBar";

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <div>
        <Curveys />
        <div className="shooting-star"></div>
        <Navbar logo={logoImg} />
      </div>
      {children}
    </>
  );
};

export default Layout;
