import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { login, register } from "../api/authApi";

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log("Login successful:", data);
      // Handle successful login (e.g., store token, redirect, etc.)
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
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
      {tabIndex === 0 && (
        <Box>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Zaloguj się
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Hasło"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Zaloguj się
          </Button>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Zarejestruj się
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Imię"
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nazwisko"
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Numer telefonu"
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label="Hasło"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Potwierdź hasło"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Zarejestruj się
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Login;
