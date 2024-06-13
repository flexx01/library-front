import React, { useState, useEffect, useContext } from "react";
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
  Alert,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const UserFines = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchFines();
    }
  }, [user]);

  const fetchFines = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/fine/allByUserId?userId=${user.id}`
      );
      setFines(response.data);
    } catch (error) {
      console.error("There was an error fetching the fines!", error);
      setError(error.message);
    }
  };

  const handlePayFine = async (fineId) => {
    try {
      await axiosInstance.put(`/api/fine?id=${fineId}`, { status: "PAID" });
      fetchFines(); // Refresh fines
    } catch (error) {
      console.error("There was an error paying the fine!", error);
      setError(error.message);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Moje grzywny
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine) => (
              <TableRow key={fine.id}>
                <TableCell>{fine.id}</TableCell>
                <TableCell>{fine.amount}</TableCell>
                <TableCell>{fine.status}</TableCell>
                <TableCell>
                  {fine.status === "UNPAID" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePayFine(fine.id)}
                    >
                      Zapłać
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserFines;
