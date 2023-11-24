import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () =>  useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedInState] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const logout = () => {
    localStorage.removeItem('user');
    setUserLoggedInState(null);
  };

const  signin = (user) => {

localStorage.setItem('user', JSON.stringify(user));
setUserLoggedInState(user);  };

  return (
    <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn:signin, logout, }}>
      {children}
    </UserContext.Provider>
  );
};