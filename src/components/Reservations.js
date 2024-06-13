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
} from "@mui/material";

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [search,setSearch] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axiosInstance.get("/api/me");
            if(response.status === 200) {
                setReservations(response.data.reservations);
                console.log(response.data.reservations);
            }
        } catch (error) {
            console.error("There was an error fetching the books!", error);
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
            console.error("There was an error fetching the books!", error);
            setError(error);
        }
    }


    return (
        <Box gap={4} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Twoje Rezerwacje
            </Typography>
            <Box>
                <TextField id="outlined-basic" label="Szukaj" variant="outlined" value={search} onChange={ e => setSearch(e.target.value)}/>
            </Box>
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
                        {reservations.map((reserv) => (
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
