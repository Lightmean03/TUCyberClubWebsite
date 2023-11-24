import React from "react";
import { Route, Navigate, } from "react-router-dom";
import { useUser } from "../Components/Signin/UserContext";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      element={() => (
        user && user.role === role ? <Component /> : <Navigate to="/signin" />
      )}
    />
  );
};

export default ProtectedRoute;
