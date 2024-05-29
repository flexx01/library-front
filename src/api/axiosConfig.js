// src/api/axiosConfig.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://biblioteka-39f72f16d605.herokuapp.com/", // Replace with your Swagger API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add the Authorization header if a token is present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5wbCIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTc0ODA5MzEwNCwiaWF0IjoxNzE2OTg5MTA0LCJ1c2VySWQiOjF9.ovYgjUFpLPpvknZ3niQH-yEuou_xtJR41GQGiyVxFqc'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function setToken(token){
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  )
}


