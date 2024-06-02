// src/screens/BookManagement.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { red } from '@mui/material/colors';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/api/book/all');
      setBooks(response.data);
    } catch (error) {
      console.error('There was an error fetching the books!', error);
      setError(error);
    }
  };

  const handleClickOpen = (id) => {
    setSelectedBook(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/book?id=${selectedBook}`);
      setBooks(books.filter(book => book.id !== selectedBook));
      setOpen(false);
    } catch (error) {
      console.error("There was an error deleting the book!", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Książki
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/add-book')}
        >
          Dodaj książkę
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tytuł</TableCell>
              <TableCell>Autorzy</TableCell>
              <TableCell>Kategoria</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/books/${book.id}`)}
                  >
                    Edytuj
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: red[500], color: 'white' }}
                    onClick={() => handleClickOpen(book.id)}
                  >
                    Usuń
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/admin/books/${book.id}/copies`)}
                  >
                    Zarządzaj kopiami
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Czy na pewno chcesz usunąć książkę?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tego działania nie można cofnąć. Proszę potwierdzić, że chcesz usunąć tę książkę.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleDelete} sx={{ color: red[500] }}>
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookManagement;
