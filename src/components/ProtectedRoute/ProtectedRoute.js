import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    props.loggedIn === null ? null : props.loggedIn ? <Component {...props}/> : <Navigate to="/" />
  )
}

export default ProtectedRoute;
