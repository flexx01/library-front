import {axiosInstance, setToken} from "./axiosConfig";
import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("https://biblioteka-39f72f16d605.herokuapp.com/api/login", {
      email,
      password,
    });
    const token = response.data.token; // Assuming the token is in the response
    localStorage.setItem("authToken", token); // Store the token
    setToken(token);                  //Dodanie tokenu do wszystkich zapytań
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
