import axiosInstance from "./axiosConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const token = response.data.token; // Assuming the token is in the response
    localStorage.setItem("authToken", token); // Store the token
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (userDetails) => {
  try {
    const response = await axiosInstance.post("/auth/register", userDetails);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
