import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
} from "@mui/material";

const AdminFines = () => {
  const [fines, setFines] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFine, setSelectedFine] = useState(null);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      const response = await axiosInstance.get("/api/fine/all");
      setFines(response.data);
    } catch (error) {
      console.error("There was an error fetching the fines!", error);
      setError(error.message);
    }
  };

  const handleOpenDialog = (fine) => {
    setSelectedFine(fine);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFine(null);
  };

  const handleFineAction = async () => {
    try {
      if (selectedFine) {
        await axiosInstance.put(`/api/fine`, {
          id: selectedFine.id,
          amount,
          userId,
        });
      } else {
        await axiosInstance.post(`/api/fine/addByUserId`, { amount, userId });
      }
      fetchFines(); // Refresh fines
      handleClose();
    } catch (error) {
      console.error("There was an error processing the fine!", error);
      setError(error.message);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Zarządzaj grzywnami
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog(null)}
        sx={{ mb: 2 }}
      >
        Dodaj grzywnę
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID użytkownika</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine) => (
              <TableRow key={fine.id}>
                <TableCell>{fine.id}</TableCell>
                <TableCell>{fine.userId}</TableCell>
                <TableCell>{fine.amount}</TableCell>
                <TableCell>{fine.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(fine)}
                  >
                    Edytuj
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedFine ? "Zaktualizuj grzywnę" : "Dodaj grzywnę"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedFine
              ? "Wprowadź nowe dane grzywny."
              : "Wprowadź dane, aby dodać nową grzywnę."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Kwota"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ID użytkownika"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleFineAction} color="primary">
            {selectedFine ? "Zaktualizuj" : "Dodaj"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminFines;
