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
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const PublicBookList = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [selectedBookCopies, setSelectedBookCopies] = useState([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [search, setSearch] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchBooks();
  }, [search]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/api/me");
        if(response.status === 200) {
          setUserId(response.data.id);
        }
      } catch (e) {

      }
    })();
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/api/book/all?search=" + search);
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
      setSelectedBookId(bookId);
      setOpen(true);
    } catch (error) {
      console.error("There was an error fetching the copies!", error);
      setError(error);
    }
  };

  const reserveCopy = async (copyId) => {
    try {
      const body = {
        userId,
        copyId,
      }
      await axiosInstance.post("/api/reservation/addByCopyId", body);
    } catch (error) {
    } finally {
      handleClose();
      fetchBooks();
    }
  };

  const copyStatusMapper = (copyStatus) => {
    switch(copyStatus) {
      case "AVAILABLE":
        return "Dostępna";
      case "RESERVED":
        return "Zarezerwowana";
      case "LOST":
        return "Stracona";
      default:
        return "";
    }
  }

  const handleClose = () => {
    setOpen(false);
    setSuccess(null);
    setError(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedBooks = books.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Książki
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField id="outlined-basic" label="Szukaj" variant="outlined" value={search} onChange={ e => setSearch(e.target.value)}/>
      </Box>
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
            count={Math.ceil(books.length / rowsPerPage)}
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book) => (
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
            {selectedBookCopies.length > 0 ?
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
                    <TableCell>{copyStatusMapper(copy.status)}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={async () => {await reserveCopy(copy.id)}}>
                        Zarezerwuj
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            :
                <Box justifyContent="center"
                       alignItems="center"
                        flexDirection="column">
                    <DialogContentText>
                      Brak dostępnych kopii książki.
                    </DialogContentText>
                </Box>
            }
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
