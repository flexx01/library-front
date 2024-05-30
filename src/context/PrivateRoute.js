import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Użytkownik niezalogowany
    return <Navigate to="/" />;
  }

  // Użytkownik zalogowany i posiada wymagane uprawnienia
  return <Outlet />;
};

export default PrivateRoute;
