import { useEffect } from "react";

// import logoImg from "@public/assets/ClubSymbol";
import Navbar from "../NavBar";

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
