import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  axiosInstance  from '../api/axiosConfig';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        loans: null,
        role: '',
        phoneNumber: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user with ID:', id); // Logowanie ID użytkownika
                const response = await axiosInstance.get(`/api/users?id=${id}`);
                console.log('User data:', response.data); // Logowanie danych użytkownika
                setUser({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: response.data.password,
                    email: response.data.email,
                    loans: response.data.loans,
                    role: response.data.role,
                    phoneNumber: response.data.phoneNumber
                });
                setIsAdmin(response.data.role === 'ADMIN');
            } catch (error) {
                console.error("There was an error fetching the user data!", error);
            }
        };

        fetchUser();
    }, [id]);

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
                console.log('Updating user with data:', user); // Logowanie danych użytkownika
                const response = await axiosInstance.put(`/api/users`, user);
                console.log('Response:', response); // Logowanie odpowiedzi serwera
            } catch (error) {
                console.error("There was an error updating the user data!", error);
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
                Edycja użytkownika
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
                Zapisz
            </Button>
        </Box>
    );
};

export default UserEdit;
// Eksportowanie komponentu UserEdit jako domyślnego eksportu
