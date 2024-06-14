import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
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
  Alert,
} from "@mui/material";

const UserLoans = () => {
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axiosInstance.get("/api/loan/all");
        const userLoans = response.data.filter(
          (loan) => loan.user.id === user.id
        );
        setLoans(userLoans);
      } catch (error) {
        console.error("There was an error fetching the loans!", error);
        setError("Błąd podczas pobierania wypożyczeń");
      }
    };

    if (user) {
      fetchLoans();
    }
  }, [user]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Moje Wypożyczenia
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tytuł książki</TableCell>
              <TableCell>Data wypożyczenia</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.id}</TableCell>
                <TableCell>{loan.copy.book.title}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>{loan.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserLoans;
