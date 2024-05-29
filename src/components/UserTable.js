import React, { useState, useEffect } from 'react';
// Importowanie bibliotek React i hooków useState oraz useEffect

import { axiosInstance } from '../api/axiosConfig';
// Importowanie instancji axiosa z konfiguracji

import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Typography, Box, Button, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
// Importowanie komponentów Material-UI

import { useNavigate } from 'react-router-dom';
// Importowanie hooka useNavigate do nawigacji

import { red } from '@mui/material/colors';
// Importowanie koloru czerwonego z Material-UI

const UserTable = () => {
    // Definiowanie komponentu UserTable

    const [users, setUsers] = useState([]);
    // Definiowanie stanu users, który przechowuje listę użytkowników

    const [open, setOpen] = useState(false);
    // Definiowanie stanu open, który kontroluje otwarcie okna dialogowego

    const [selectedUser, setSelectedUser] = useState(null);
    // Definiowanie stanu selectedUser, który przechowuje aktualnie wybranego użytkownika do usunięcia

    const navigate = useNavigate();
    // Inicjalizacja hooka useNavigate do nawigacji

    useEffect(() => {
        // Hook useEffect, który wykonuje się po renderowaniu komponentu

        const fetchUsers = async () => {
            // Definiowanie asynchronicznej funkcji fetchUsers

            try {
                // Próba wykonania kodu

                const response = await axiosInstance.get('/api/users/all');
                // Wykonywanie zapytania GET do API, aby pobrać wszystkich użytkowników

                setUsers(response.data);
                // Ustawienie stanu users na dane otrzymane z odpowiedzi API

            } catch (error) {
                // Obsługa błędów, jeśli wystąpił błąd podczas pobierania danych

                console.error("There was an error fetching the users!", error);
                // Logowanie błędu do konsoli
            }
        };

        fetchUsers();
        // Wywołanie funkcji fetchUsers

    }, []);
    // Pusta tablica zależności oznacza, że useEffect wykona się tylko raz po zamontowaniu komponentu

    const handleDelete = async () => {
        // Definiowanie asynchronicznej funkcji handleDelete do usuwania użytkownika

        try {
            // Próba wykonania kodu

            await axiosInstance.delete(`/api/users?id=${selectedUser}`);
            // Wykonywanie zapytania DELETE do API, aby usunąć wybranego użytkownika

            setUsers(users.filter(user => user.id !== selectedUser));
            // Aktualizacja stanu users, usuwając usuniętego użytkownika z listy

            setOpen(false);
            // Zamknięcie okna dialogowego

        } catch (error) {
            // Obsługa błędów, jeśli wystąpił błąd podczas usuwania użytkownika

            console.error("There was an error deleting the user!", error);
            // Logowanie błędu do konsoli
        }
    };

    const handleClickOpen = (id) => {
        // Funkcja otwierająca okno dialogowe i ustawiająca wybranego użytkownika do usunięcia

        setSelectedUser(id);
        // Ustawienie stanu selectedUser na ID wybranego użytkownika

        setOpen(true);
        // Otwarcie okna dialogowego
    };

    const handleClose = () => {
        // Funkcja zamykająca okno dialogowe

        setOpen(false);
        // Zamknięcie okna dialogowego
    };

    return (
        // Zwracanie JSX, który renderuje interfejs użytkownika

        <Box sx={{ padding: 2 }}>
            {/* Główny kontener z marginesem */}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                {/* Kontener do ustawienia nagłówka i przycisku w jednej linii */}
                <Typography variant="h4" gutterBottom>
                    {/* Nagłówek */}
                    Użytkownicy
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/add-user')}
                >
                    Dodaj użytkownika
                </Button>
            </Box>
            {/* Przycisk do dodawania nowego użytkownika */}

            <TableContainer component={Paper}>
                {/* Kontener tabeli osadzony w komponencie Paper */}

                <Table>
                    {/* Tabela */}

                    <TableHead>
                        {/* Nagłówek tabeli */}

                        <TableRow>
                            {/* Wiersz nagłówka */}
                            <TableCell>ID</TableCell>
                            <TableCell>Imię</TableCell>
                            <TableCell>Nazwisko</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rola</TableCell>
                            <TableCell>Numer telefonu</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Ciało tabeli */}
                        {users.map(user => (
                            // Mapowanie przez użytkowników i tworzenie wierszy dla każdego z nich

                            <TableRow key={user.id}>
                                {/* Wiersz dla użytkownika */}
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>
                                    {/* Komórka z przyciskiem edycji */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/user/${user.id}`)}
                                    >
                                        Edytuj
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {/* Komórka z przyciskiem usuwania */}
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: red[500], color: 'white' }}
                                        onClick={() => handleClickOpen(user.id)}
                                    >
                                        Usuń
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
                {/* Okno dialogowe do potwierdzenia usunięcia */}
                <DialogTitle>Czy na pewno chcesz usunąć użytkownika?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tego działania nie można cofnąć. Proszę potwierdzić, że chcesz usunąć tego użytkownika.
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

export default UserTable;
// Eksportowanie komponentu UserTable jako domyślnego eksportu
