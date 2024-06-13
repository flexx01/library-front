import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const ReturnBook = () => {
  const [loanId, setLoanId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReturnBook = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.get(
        `/api/loan/closeLoan?id=${loanId}`
      );
      setSuccess("Książka została zwrócona pomyślnie");
    } catch (error) {
      setError("Błąd podczas zwracania książki");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Zwróć książkę</Typography>
      <TextField
        label="ID wypożyczenia"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleReturnBook}>
        Zwróć
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </Box>
  );
};

export default ReturnBook;
