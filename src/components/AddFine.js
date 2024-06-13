import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const AddFine = () => {
  const [fineDetails, setFineDetails] = useState({
    userId: "",
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFineDetails({ ...fineDetails, [name]: value });
  };

  const handleAddFine = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post(
        "/api/fine/addByUserId",
        fineDetails
      );
      setSuccess("Grzywna została dodana pomyślnie");
    } catch (error) {
      setError("Błąd podczas dodawania grzywny");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Dodaj grzywnę</Typography>
      <TextField
        label="ID użytkownika"
        name="userId"
        value={fineDetails.userId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Kwota"
        name="amount"
        value={fineDetails.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Opis"
        name="description"
        value={fineDetails.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddFine}>
        Dodaj
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </Box>
  );
};

export default AddFine;
