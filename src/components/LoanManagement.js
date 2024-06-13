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
} from "@mui/material";

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axiosInstance.get("/api/loan/allByUserId");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      setError(error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Twoje Wypożyczenia
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Książka</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data Wypożyczenia</TableCell>
              <TableCell>Data Zwrotu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>{loan.book.title}</TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>{loan.borrowDate}</TableCell>
                <TableCell>{loan.returnDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && <Typography color="error">Błąd: {error.message}</Typography>}
    </Box>
  );
};

export default LoanManagement;
