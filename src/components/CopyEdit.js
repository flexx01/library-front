// src/components/CopyEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CopyEdit = () => {
  const { id, copyId } = useParams();
  const navigate = useNavigate();
  const [copy, setCopy] = useState({
    id: 0,
    book: { id: 0, title: '', authors: '', category: '' },
    status: 'AVAILABLE',
    location: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCopyDetails();
  }, [copyId]);

  const fetchCopyDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/copy?id=${copyId}`);
      setCopy(response.data);
    } catch (error) {
      console.error('There was an error fetching the copy details!', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCopy({ ...copy, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.location = copy.location ? '' : 'To pole jest wymagane.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const updatedCopy = {
          id: copy.id,
          book: copy.book,
          status: copy.status,
          location: copy.location
        };
        await axiosInstance.put('/api/copy', updatedCopy);
        navigate(`/admin/books/${id}/copies`);
      } catch (error) {
        console.error('There was an error updating the copy!', error);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edytuj kopię książki
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={copy.status}
          onChange={handleInputChange}
          label="Status"
        >
          <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
          <MenuItem value="BORROWED">BORROWED</MenuItem>
          <MenuItem value="RESERVED">RESERVED</MenuItem>
          <MenuItem value="LOST">LOST</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Location"
        name="location"
        value={copy.location}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.location}
        helperText={errors.location}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  );
};

export default CopyEdit;
