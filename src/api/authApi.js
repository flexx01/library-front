import axiosInstance from "./axiosConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/login", {
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
    const response = await axiosInstance.post("/api/register", userDetails);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.get("/api/logout");
    localStorage.removeItem("authToken"); // Remove the token
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/api/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
