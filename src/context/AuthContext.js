import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axiosInstance.get("/api/me");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const login = async (userData) => {
    console.log(userData)
    localStorage.setItem("authToken", userData.token);
    await fetchUserDetails(userData.token);
  };

  const logout = async () => {
    await axiosInstance.get("/api/logout");
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const updateUser = async (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
