import React from 'react';
import { Route, Navigate } from 'react-router-dom';
interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  user: { role: string } | null; 
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  user,
  role,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={
        user && user.role === role ? (
          element
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;