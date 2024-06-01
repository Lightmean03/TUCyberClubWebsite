import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/authContext';


const ProtectedRoute = () => {
    const { user } = useAuth();

        return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
