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
    TextField,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid
} from "@mui/material";

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axiosInstance.get("/api/me");
            if(response.status === 200) {
                setReservations(response.data.reservations);
            }
        } catch (error) {
            console.error("There was an error fetching the reservations!", error);
            setError(error);
        }
    };

    const deleteReservation = async (reservationId) => {
        try {
            const response = await axiosInstance.delete("/api/reservation?id=" + reservationId);
            if(response.status === 200) {
                await fetchReservations();
            }
        } catch (error) {
            console.error("There was an error deleting the reservation!", error);
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

    const paginatedReservations = reservations.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Twoje Rezerwacje
            </Typography>
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
                        count={Math.ceil(reservations.length / rowsPerPage)}
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
                            <TableCell>Data</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedReservations.map((reserv) => (
                            <TableRow key={reserv.id}>
                                <TableCell>{reserv.id}</TableCell>
                                <TableCell>{reserv.copy.book.title}</TableCell>
                                <TableCell>{reserv.copy.book.authors}</TableCell>
                                <TableCell>{reserv.copy.book.category}</TableCell>
                                <TableCell>{reserv.reservationDate}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={async () => {
                                           await deleteReservation(reserv.id);
                                        }}
                                    >
                                        Usuń rezerwacje
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {error && (
                <Typography color="error">
                    Błąd podczas pobierania danych: {error.message}
                </Typography>
            )}
        </Box>
    );
};

export default Reservations;
