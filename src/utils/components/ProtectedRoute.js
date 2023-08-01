import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../routes';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to={LOGIN_ROUTE} />;
};

export default ProtectedRoute;
