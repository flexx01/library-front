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
        `/api/fine/allByUserId?id=${user.id}`
      );
      console.log(response.data);
      setFines(response.data);
    } catch (error) {
      console.error("There was an error fetching the fines!", error);
      setError(error.message);
    }
  };

  const handlePayFine = async (fineId) => {
    try {
      await axiosInstance.delete(`/api/fine?id=${fineId}`);
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
              <TableCell>Powód</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.length > 0 ? fines?.map((fine) => (
              <TableRow key={fine.id}>
                <TableCell>{fine.id}</TableCell>
                <TableCell>{fine.amount}</TableCell>
                <TableCell>{fine.reason ?? 'Nie określony'}</TableCell>
                <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePayFine(fine.id)}
                    >
                      Zapłać
                    </Button>
                </TableCell>
              </TableRow>
            )) : "Brak zaległych płatności"}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserFines;
