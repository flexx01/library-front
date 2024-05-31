import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext'; // Importowanie kontekstu autoryzacji
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const UserProfileEdit = () => {
    const navigate = useNavigate();
    const { user: authUser } = useContext(AuthContext); // Pobranie zalogowanego użytkownika z kontekstu
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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user with ID:', authUser.id); // Logowanie ID użytkownika
                const response = await axiosInstance.get(`/api/users?id=${authUser.id}`);
                console.log('User data:', response.data); // Logowanie danych użytkownika
                setUser({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: '',
                    email: response.data.email,
                    loans: response.data.loans,
                    role: response.data.role,
                    phoneNumber: response.data.phoneNumber
                });
            } catch (error) {
                console.error("There was an error fetching the user data!", error);
            }
        };

        if (authUser) {
            fetchUser();
        }
    }, [authUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
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
            navigate('/'); // Przekierowanie po zapisaniu zmian
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Edytuj swój profil
                </Typography>
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Dane osobowe
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
                </Box>
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Dane logowania
                    </Typography>
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
                </Box>
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Kontakt
                    </Typography>
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
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSaveAndNavigate} // Wywołuje funkcję, która zapisuje i nawiguję
                >
                    Zapisz
                </Button>
            </Paper>
        </Box>
    );
};

export default UserProfileEdit;
// Eksportowanie komponentu UserProfileEdit jako domyślnego eksportu
