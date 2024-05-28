import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://biblioteka-39f72f16d605.herokuapp.com/", // Replace with your Swagger API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add the Authorization header if a token is present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
