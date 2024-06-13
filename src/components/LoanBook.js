import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const LoanBook = () => {
  const [loanDetails, setLoanDetails] = useState({
    userId: "",
    copyId: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };

  const handleLoanBook = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post("/api/loan", loanDetails);
      setSuccess("Książka została wypożyczona pomyślnie");
    } catch (error) {
      setError("Błąd podczas wypożyczania książki");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Wypożycz książkę</Typography>
      <TextField
        label="ID użytkownika"
        name="userId"
        value={loanDetails.userId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ID kopii książki"
        name="copyId"
        value={loanDetails.copyId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLoanBook}>
        Wypożycz
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </Box>
  );
};

export default LoanBook;
