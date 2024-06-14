import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User not logged in
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // User does not have the required role
    return <Navigate to="/" />;
  }

  // User is logged in and has the required role
  return <Outlet />;
};

export default PrivateRoute;
