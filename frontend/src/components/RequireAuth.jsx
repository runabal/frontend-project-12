import React from 'react';
import { useSelector } from 'reacе-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuth } from '../slices/authSlice';

const RequireAuth = () => {
  const isAuth = useSelector(selectIsAuth);
  const tokenInStorage = localStorage.getItem('token');

  if (!isAuth && !tokenInStorage) {
  return <Navigate to="/login" replace />;
  }
  return <Outlet />;
  };

export default RequireAuth;
