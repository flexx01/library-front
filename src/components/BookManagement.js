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
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/api/book/all?search=" + search);
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
      setError(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedBooks = books.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEdit = (id) => {
    navigate(`/admin/books/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/book?id=${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("There was an error deleting the book!", error);
      setError(error);
    }
  };

  const handleAddBook = () => {
    navigate("/admin/add-book");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Zarządzanie Książkami
        </Typography>
        <TextField
          label="Szukaj"
          variant="outlined"
          size="small"
          sx={{ marginRight: 2 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddBook}
        >
          Dodaj Książkę
        </Button>
      </Box>
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
            count={Math.ceil(books.length / rowsPerPage)}
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
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "nowrap" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(book.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Edytuj
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(book.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Usuń
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/admin/books/${book.id}/copies`)}
                      sx={{ backgroundColor: "#f0ad4e", color: "white", flexShrink: 0 }} // poprzedni kolor
                    >
                      Zarządzaj kopiami
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && <Typography color="error">{error.message}</Typography>}
    </Box>
  );
};

export default BookManagement;
