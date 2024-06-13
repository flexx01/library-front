import React, { useState, useEffect, useContext } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const PublicBookList = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [selectedBookCopies, setSelectedBookCopies] = useState([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(null); // Add state for selectedBookId
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/api/book/all");
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
      setError(error);
    }
  };

  const fetchCopies = async (bookId, title) => {
    try {
      const response = await axiosInstance.get(
        `/api/copy/allByBookId?bookId=${bookId}`
      );
      const availableCopies = response.data.filter(
        (copy) => copy.status === "AVAILABLE"
      );
      setSelectedBookCopies(availableCopies);
      setSelectedBookTitle(title);
      setSelectedBookId(bookId); // Set selectedBookId
      setOpen(true);
    } catch (error) {
      console.error("There was an error fetching the copies!", error);
      setError(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(null);
    setError(null);
  };

  const handleReserve = async (copyId) => {
    try {
      await axiosInstance.post("/api/reservation/addByCopyId", {
        copyId,
        userId: user.id,
      });
      setSuccess("Rezerwacja zakończona sukcesem");
      fetchCopies(selectedBookId, selectedBookTitle); // Refresh copies
    } catch (error) {
      console.error("There was an error reserving the copy!", error);
      setError("Błąd podczas rezerwacji kopii");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Książki
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tytuł</TableCell>
              <TableCell>Autorzy</TableCell>
              <TableCell>Kategoria</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchCopies(book.id, book.title)}
                  >
                    Sprawdź dostępność
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Kopie książki: {selectedBookTitle}</DialogTitle>
        <DialogContent>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Lokalizacja</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Akcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBookCopies.map((copy) => (
                  <TableRow key={copy.id}>
                    <TableCell>{copy.id}</TableCell>
                    <TableCell>{copy.location}</TableCell>
                    <TableCell>{copy.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleReserve(copy.id)}
                      >
                        Zarezerwuj
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PublicBookList;
