import React, { useEffect } from 'react';

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return <div>{children}</div>;
};

export default Layout;
