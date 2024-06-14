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
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

const LoanHistory = () => {
  const [loans, setLoans] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const response = await axiosInstance.get("/api/me");
      if (response.status === 200) {
        setUserId(response.data.id);
        setLoans(response.data.loans);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(e);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedLoans = loans.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const loanStatusMapper = (loanStatus) => {
    switch (loanStatus) {
      case "IN_PROGRESS":
        return "Wypożyczona";
      case "FINISHED":
        return "Zwrócona";
      default:
        return "Nieznany";
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Historia wypożyczeń
      </Typography>
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
            count={Math.ceil(loans.length / rowsPerPage)}
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
              <TableCell>Tytuł</TableCell>
              <TableCell>Autorzy</TableCell>
              <TableCell>Kategoria</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data wypożyczenia</TableCell>
              <TableCell>Zwrot do</TableCell>
              <TableCell>Data zwrotu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLoans.map((loan) => (
              <TableRow key={loan.copy.book.id}>
                <TableCell>{loan.copy.book.id}</TableCell>
                <TableCell>{loan.copy.book.title}</TableCell>
                <TableCell>{loan.copy.book.authors}</TableCell>
                <TableCell>{loan.copy.book.category}</TableCell>
                <TableCell>{loanStatusMapper(loan.status)}</TableCell>
                <TableCell>{loan?.loanDate}</TableCell>
                <TableCell>{loan?.maxReturnDate}</TableCell>
                <TableCell>{loan?.returnDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Typography color="error">
          Błąd podczas pobierania danych: {error?.message}
        </Typography>
      )}
    </Box>
  );
};

export default LoanHistory;
