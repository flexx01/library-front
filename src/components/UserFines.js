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
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const UserFines = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedFines = fines.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" mb={2} sx={{ flexWrap: "nowrap" }}>
        <Grid item>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Liczba na stronę</InputLabel>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              label="Liczba na stronę"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(fines.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Grid>
      </Grid>
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
            {paginatedFines.length > 0 ? paginatedFines.map((fine) => (
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
            )) : (
              <TableRow>
                <TableCell colSpan={4}>Brak zaległych płatności</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserFines;
