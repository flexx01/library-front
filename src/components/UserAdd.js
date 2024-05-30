import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  axiosInstance from '../api/axiosConfig';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Alert } from '@mui/material';

const UserAdd = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        role: 'USER',
        phoneNumber: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleAdminChange = (e) => {
        setIsAdmin(e.target.checked);
        setUser({ ...user, role: e.target.checked ? 'ADMIN' : 'USER' });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstName = user.firstName ? "" : "To pole jest wymagane.";
        tempErrors.lastName = user.lastName ? "" : "To pole jest wymagane.";
        tempErrors.password = user.password ? "" : "To pole jest wymagane.";
        tempErrors.email = user.email ? "" : "To pole jest wymagane.";
        tempErrors.phoneNumber = user.phoneNumber ? "" : "To pole jest wymagane.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSave = async () => {
        if (validate()) {
            try {
                console.log('Adding user with data:', user); // Logowanie danych użytkownika
                const response = await axiosInstance.post('/api/users', user);
                console.log('Response:', response); // Logowanie odpowiedzi serwera
            } catch (error) {
                console.error("There was an error adding the user!", error);
            }
        }
    };

    const handleSaveAndNavigate = async () => {
        if (validate()) {
            await handleSave();
            navigate('/admin'); // Przekierowanie po zapisaniu zmian
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Dodaj użytkownika
            </Typography>
            <TextField
                label="Imię"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName}
            />
            <TextField
                label="Nazwisko"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName}
            />
            <TextField
                label="Hasło"
                name="password"
                type="password"
                value={user.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
            />
            <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                label="Numer Telefonu"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
            />
            <FormControlLabel
                control={<Checkbox checked={isAdmin} onChange={handleAdminChange} />}
                label="Admin"
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSaveAndNavigate} // Wywołuje funkcję, która zapisuje i nawiguję
            >
                Dodaj
            </Button>
        </Box>
    );
};

export default UserAdd;
// Eksportowanie komponentu UserAdd jako domyślnego eksportu
