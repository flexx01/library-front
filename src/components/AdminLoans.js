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

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [copyId, setCopyId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axiosInstance.get("/api/loan/all");
      setLoans(response.data);
    } catch (error) {
      console.error("There was an error fetching the loans!", error);
      setError(error.message);
    }
  };

  const handleOpenDialog = (loan) => {
    setSelectedLoan(loan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLoan(null);
  };

  const handleLoanAction = async () => {
    try {
      await axiosInstance.post("/api/loan", { copyId, userId });
      fetchLoans(); // Refresh loans
      handleClose();
    } catch (error) {
      console.error("There was an error processing the loan!", error);
      setError(error.message);
    }
  };

  const handleReturnBook = async (loanId) => {
    try {
      await axiosInstance.get(`/api/loan/closeLoan?id=${loanId}`);
      fetchLoans(); // Refresh loans
    } catch (error) {
      console.error("There was an error closing the loan!", error);
      setError(error.message);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Zarządzaj wypożyczeniami
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
        Wypożycz książkę
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID użytkownika</TableCell>
              <TableCell>ID kopii</TableCell>
              <TableCell>Data wypożyczenia</TableCell>
              <TableCell>Data zwrotu</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>{loan.user.id}</TableCell>
                <TableCell>{loan.copy.id}</TableCell>
                <TableCell>
                  {new Date(loan.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {loan.endDate
                    ? new Date(loan.endDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>
                  {loan.status === "BORROWED" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReturnBook(loan.id)}
                    >
                      Zwrot książki
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedLoan ? "Zaktualizuj wypożyczenie" : "Dodaj wypożyczenie"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedLoan
              ? "Wprowadź nowe dane wypożyczenia."
              : "Wprowadź dane, aby dodać nowe wypożyczenie."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ID kopii"
            fullWidth
            value={copyId}
            onChange={(e) => setCopyId(e.target.value)}
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
          <Button onClick={handleLoanAction} color="primary">
            {selectedLoan ? "Zaktualizuj" : "Dodaj"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminLoans;
