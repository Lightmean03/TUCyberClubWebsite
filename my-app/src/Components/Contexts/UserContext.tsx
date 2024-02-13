import React, { ReactNode, createContext, useContext, useState } from "react";
const UserContext = createContext<any | null>(null);


export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [userLoggedIn, setUserLoggedInState] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from local storage:", error);
      return null;
    }
  });

  const logout = () => {
    if (!userLoggedIn) return null;
    localStorage.removeItem("user");
    setUserLoggedInState(false);
  };

  const signin = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserLoggedInState(user);
  };


  return (
    <UserContext.Provider
      value={{ userLoggedIn, setUserLoggedIn: signin, logout, setUserLoggedInState }}
    >
      {children}
    </UserContext.Provider>
  );
};
