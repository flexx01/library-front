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
} from "@mui/material";

const FineManagement = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      const response = await axiosInstance.get("/api/fine/allByUserId");
      setFines(response.data);
    } catch (error) {
      console.error("Error fetching fines:", error);
      setError(error);
    }
  };

  const payFine = async (fineId) => {
    try {
      await axiosInstance.delete(`/api/fine?id=${fineId}`);
      setFines(fines.filter((fine) => fine.id !== fineId));
    } catch (error) {
      console.error("Error paying fine:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Twoje Grzywny
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Opis</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine) => (
              <TableRow key={fine.id}>
                <TableCell>{fine.id}</TableCell>
                <TableCell>{fine.amount}</TableCell>
                <TableCell>{fine.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => payFine(fine.id)}
                  >
                    Opłać
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && <Typography color="error">Błąd: {error.message}</Typography>}
    </Box>
  );
};

export default FineManagement;
