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
} from "@mui/material";


const LoanHistory = () => {
    const [loans, setLoans] = useState([]);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMe()
    }, []);


    const fetchMe = async () => {
        try {
            const response = await axiosInstance.get("/api/me");
            if (response.status === 200) {
                setUserId(response.data.id);
                setLoans(response.data.loans);
            } else {
                setError(true);
            }
        }catch (e) {
            setError(e);
        }
    }


    const loanStatusMapper = (loanStatus) => {
        switch (loanStatus) {
            case "IN_PROGRESS":
                return "Wypożyczona";
            case "FINISHED":
                return "Zwrócona";
            default:
                return "Nieznany";
        }
    }

    return (
        <Box gap={4} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Historia wypożyczeń
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tytuł</TableCell>
                            <TableCell>Autorzy</TableCell>
                            <TableCell>Kategoria</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Data wypożyczenia</TableCell>
                            <TableCell>Zwrot do</TableCell>
                            <TableCell>Data zwrotu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map((loan) => (
                            <TableRow key={loan.copy.book.id}>
                                <TableCell>{loan.copy.book.id}</TableCell>
                                <TableCell>{loan.copy.book.title}</TableCell>
                                <TableCell>{loan.copy.book.authors}</TableCell>
                                <TableCell>{loan.copy.book.category}</TableCell>
                                <TableCell>{loanStatusMapper(loan.status)}</TableCell>
                                <TableCell>{loan?.loanDate}</TableCell>
                                <TableCell>{loan?.maxReturnDate}</TableCell>
                                <TableCell>{loan?.returnDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {error && (
                <Typography color="error">
                    Błąd podczas pobierania danych: {error?.message}
                </Typography>
            )}
        </Box>
    );
};

export default LoanHistory;
