import React, { useEffect } from "react";

import Curveys from "./Curvey/Curveys";
import logoImg from "./Images/ClubSymbol.png";
import Navbar from "../NavBar";

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <div>
        <Navbar logo={logoImg} />
      </div>
      {children}
    </>
  );
};

export default Layout;
