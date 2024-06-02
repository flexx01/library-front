// src/components/BookAdd.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { Box, TextField, Button, Typography } from '@mui/material';

const BookAdd = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    authors: '',
    category: '',
    countOfCopy: '',
    copyLocation: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.title = book.title ? '' : 'To pole jest wymagane.';
    tempErrors.authors = book.authors ? '' : 'To pole jest wymagane.';
    tempErrors.category = book.category ? '' : 'To pole jest wymagane.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        console.log('Adding book with data:', book); // Logowanie danych książki
        const response = await axiosInstance.post('/api/book', book);
        console.log('Response:', response); // Logowanie odpowiedzi serwera
      } catch (error) {
        console.error('There was an error adding the book!', error);
      }
    }
  };

  const handleSaveAndNavigate = async () => {
    if (validate()) {
      await handleSave();
      navigate('/admin/books'); // Przekierowanie po zapisaniu zmian
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dodaj książkę
      </Typography>
      <TextField
        label="Tytuł"
        name="title"
        value={book.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Autorzy"
        name="authors"
        value={book.authors}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.authors}
        helperText={errors.authors}
      />
      <TextField
        label="Kategoria"
        name="category"
        value={book.category}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.category}
        helperText={errors.category}
      />
      <TextField
        label="Ilość kopii"
        name="countOfCopy"
        value={book.countOfCopy}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Lokalizacja kopii"
        name="copyLocation"
        value={book.copyLocation}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveAndNavigate} // Wywołuje funkcję, która zapisuje i nawiguję
        sx={{ mt: 2 }}
      >
        Dodaj
      </Button>
    </Box>
  );
};

export default BookAdd;
