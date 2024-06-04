import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setError(""); // Clear error message when switching tabs
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear any previous error messages
    if (!email || !password) {
      setError("Email i hasło są wymagane");
      return;
    }
    try {
      const data = await login(email, password);
      console.log("Login successful:", data);
      await loginContext(data); // Update context
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Login error:", error);
      setError("Nieprawidłowy email lub hasło"); // Set error message for failed login
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear any previous error messages
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      setError("Wszystkie pola są wymagane");
      return;
    }
    if (password !== confirmPassword) {
      setError("Hasła nie są zgodne");
      return;
    }

    const userDetails = {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    };

    try {
      const data = await register(userDetails);
      console.log("Registration successful:", data);
      // Handle successful registration (e.g., redirect to login, etc.)
    } catch (error) {
      console.error("Registration error:", error);
      setError("Rejestracja nie powiodła się"); // Set error message for failed registration
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        m: 10,
        border: "1px solid",
        borderRadius: "18px",
        borderColor: "rgba(0,0,0, 0.12)",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            width: { xs: "100%", sm: "auto" },
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}
        >
          <Tab label="Zaloguj się" />
          <Tab label="Zarejestruj się" />
        </Tabs>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {tabIndex === 0 && (
        <Box component="form" onSubmit={handleLogin}>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Zaloguj się
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Hasło"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Zaloguj się
          </Button>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box component="form" onSubmit={handleRegister}>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Zarejestruj się
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Imię"
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nazwisko"
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Numer telefonu"
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Hasło"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Potwierdź hasło"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Zarejestruj się
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Login;
