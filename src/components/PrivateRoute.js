// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
  };
  
/*
const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');
  return token ? <Component /> : <Navigate to="/login" />;
};
*/

export default PrivateRoute;
