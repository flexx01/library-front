// src/components/BookCopies.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button, TextField, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { red } from '@mui/material/colors';

const BookCopies = () => {
  const { id } = useParams();
  const [copies, setCopies] = useState([]);
  const [book, setBook] = useState(null);
  const [newCopy, setNewCopy] = useState({ status: 'AVAILABLE', location: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetails();
    fetchCopies();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/book?id=${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('There was an error fetching the book details!', error);
      setError(error);
    }
  };

  const fetchCopies = async () => {
    try {
      const response = await axiosInstance.get(`/api/copy/allByBookId?bookId=${id}`);
      setCopies(response.data);
    } catch (error) {
      console.error('There was an error fetching the copies!', error);
      setError(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCopy({ ...newCopy, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.location = newCopy.location ? '' : 'To pole jest wymagane.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleAddCopy = async () => {
    if (validate()) {
      try {
        const response = await axiosInstance.post('/api/copy', { ...newCopy, bookId: id });
        setCopies([...copies, response.data]);
        setNewCopy({ status: 'AVAILABLE', location: '' });
      } catch (error) {
        console.error('There was an error adding the copy!', error);
        setError(error);
      }
    }
  };

  const handleClickOpen = (copyId) => {
    setSelectedCopy(copyId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/copy?id=${selectedCopy}`);
      setCopies(copies.filter(copy => copy.id !== selectedCopy));
      setOpen(false);
    } catch (error) {
      console.error("There was an error deleting the copy!", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Kopie książki
      </Typography>
      {book && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Tytuł: {book.title}</Typography>
          <Typography variant="h6">Autorzy: {book.authors}</Typography>
          <Typography variant="h6">Kategoria: {book.category}</Typography>
        </Box>
      )}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Lokalizacja"
          name="location"
          value={newCopy.location}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.location}
          helperText={errors.location}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCopy}
        >
          Dodaj kopię
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Lokalizacja</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copies.map((copy) => (
              <TableRow key={copy.id}>
                <TableCell>{copy.id}</TableCell>
                <TableCell>{copy.status}</TableCell>
                <TableCell>{copy.location}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/books/${id}/copies/${copy.id}/edit`)}
                  >
                    Edytuj
                  </Button>
                </TableCell>
                <TableCell>
                  {copy.status === 'AVAILABLE' && (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: red[500], color: 'white' }}
                      onClick={() => handleClickOpen(copy.id)}
                    >
                      Usuń
                    </Button>
                  )}
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
        <DialogTitle>Czy na pewno chcesz usunąć kopię książki?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tego działania nie można cofnąć. Proszę potwierdzić, że chcesz usunąć tę kopię książki.
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

export default BookCopies;
