// src/components/BookEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', authors: '', category: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log('Fetching book with ID:', id);
        const response = await axiosInstance.get(`/api/book?id=${id}`);
        console.log('Book data:', response.data);
        setBook({
          title: response.data.title,
          authors: response.data.authors,
          category: response.data.category,
        });
      } catch (error) {
        console.error('There was an error fetching the book data!', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.title = book.title ? "" : "To pole jest wymagane.";
    tempErrors.authors = book.authors ? "" : "To pole jest wymagane.";
    tempErrors.category = book.category ? "" : "To pole jest wymagane.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        console.log('Updating book with data:', book);
        const response = await axiosInstance.put(`/api/book`, { id, ...book });
        console.log('Response:', response);
        navigate('/admin/books');
      } catch (error) {
        console.error('There was an error updating the book data!', error);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edytuj książkę
      </Typography>
      <TextField
        label="Tytuł"
        name="title"
        value={book.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Autorzy"
        name="authors"
        value={book.authors}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.authors}
        helperText={errors.authors}
      />
      <TextField
        label="Kategoria"
        name="category"
        value={book.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.category}
        helperText={errors.category}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Zapisz
      </Button>
    </Box>
  );
};

export default BookEdit;
