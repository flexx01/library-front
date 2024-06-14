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
  Select,
  MenuItem,
  TextField,
  Alert,
  IconButton,
  Menu,
  MenuItem as MenuItemMui,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AuthContext } from "../context/AuthContext";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [openLoanDialog, setOpenLoanDialog] = useState(false);
  const [openFineDialog, setOpenFineDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [bookCopies, setBookCopies] = useState([]);
  const [selectedCopyId, setSelectedCopyId] = useState("");
  const [fineDetails, setFineDetails] = useState({
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/users/all");
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchFilteredUsers = async (role) => {
    try {
      const roleParam = role === "ALL" ? "" : `?role=${role}`;
      const response = await axiosInstance.get(`/api/users/all${roleParam}`);
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/users?id=${selectedUser}`);
      setUsers(users.filter((user) => user.id !== selectedUser));
      setOpenLoanDialog(false);
      setOpenFineDialog(false);
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleClickOpenLoanDialog = (id) => {
    setSelectedUser(id);
    setOpenLoanDialog(true);
  };

  const handleCloseLoanDialog = () => {
    setOpenLoanDialog(false);
    setSelectedBook(null);
    setBookSearchQuery("");
    setBookCopies([]);
    setSelectedCopyId("");
    setError("");
    setSuccess("");
  };

  const handleSearchBooks = async () => {
    try {
      const response = await axiosInstance.get(`/api/book/all`);
      const filteredBooks = response.data.filter((book) =>
        book.title.toLowerCase().includes(bookSearchQuery.toLowerCase())
      );
      setBooks(filteredBooks);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  const handleSelectBook = async (book) => {
    setSelectedBook(book);
    setSelectedCopyId(null)
    try {
      const response = await axiosInstance.get(
        `/api/copy/allByBookId?bookId=${book.id}`
      );

      setBookCopies(response.data);
    } catch (error) {
      console.error("There was an error fetching the book copies!", error);
    }
  };

  const handleLoanBook = async () => {
    setError("");
    setSuccess("");
    try {
      await axiosInstance.post("/api/loan", {
        copyId: selectedCopyId,
        userId: selectedUser,
      });
      setSuccess("Książka została wypożyczona pomyślnie");
      handleCloseLoanDialog();
    } catch (error) {
      setError("Błąd podczas wypożyczania książki");
    }
  };

  const handleClickOpenFineDialog = (id) => {
    setSelectedUser(id);
    setOpenFineDialog(true);
  };

  const handleCloseFineDialog = () => {
    setOpenFineDialog(false);
    setFineDetails({ amount: "", description: "" });
    setError("");
    setSuccess("");
  };

  const handleAddFine = async () => {
    setError("");
    setSuccess("");
    try {
      await axiosInstance.post("/api/fine/addByUserId", {
        ...fineDetails,
        userId: selectedUser,
      });
      setSuccess("Grzywna została dodana pomyślnie");
      handleCloseFineDialog();
    } catch (error) {
      setError("Błąd podczas dodawania grzywny");
    }
  };

  const handleAddUser = () => {
    if (user && user.role === "ADMIN") {
      navigate("/admin/add-user");
    } else {
      console.error("Unauthorized");
    }
  };

  const handleFilterChange = (event) => {
    const selectedRole = event.target.value;
    setFilterRole(selectedRole);
    fetchFilteredUsers(selectedRole);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleMenuClick = (event, userId) => {
    setSelectedUser(userId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    handleMenuClose();
    switch (action) {
      case "edit":
        navigate(`/admin/user/${selectedUser}`);
        break;
      case "loan":
        handleClickOpenLoanDialog(selectedUser);
        break;
      case "return":
        handleReturnBook(selectedUser);
        break;
      case "fine":
        handleClickOpenFineDialog(selectedUser);
        break;
      default:
        break;
    }
  };

  const copyStatusMapper = (copyStatus) => {
    switch (copyStatus) {
      case "AVAILABLE":
       return "Dostępna";
      case "BORROWED":
        return "Wypożyczona";
      case "RESERVED":
        return "Zarezerwowana";
      default:
        return copyStatus;
    }
  }

  const handleReturnBook = async (userId) => {
    try {
      await axiosInstance.get(`/api/loan/closeLoan?userId=${userId}`);
      setSuccess("Książka została zwrócona pomyślnie");
      // Optionally, you can refetch user loans to update the UI
    } catch (error) {
      setError("Błąd podczas zwracania książki");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery) ||
      user.lastName.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.phoneNumber.toLowerCase().includes(searchQuery)
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Użytkownicy
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Szukaj"
            variant="outlined"
            size="small"
            sx={{ marginRight: 2 }}
            onChange={handleSearchChange}
          />
          <Select
            value={filterRole}
            onChange={handleFilterChange}
            sx={{
              marginRight: 2,
              height: "40px",
              minWidth: "180px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.dark",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              backgroundColor: "primary.main",
              color: "white",
            }}
          >
            <MenuItem value="ALL">Wyświetl wszystkich</MenuItem>
            <MenuItem value="ADMIN">Wyświetl tylko administratorów</MenuItem>
            <MenuItem value="USER">Wyświetl tylko użytkowników</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "40px" }}
            onClick={handleAddUser}
          >
            Dodaj użytkownika
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Imię</TableCell>
              <TableCell>Nazwisko</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rola</TableCell>
              <TableCell>Numer telefonu</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, user.id)}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItemMui onClick={() => handleMenuAction("edit")}>
                      Edytuj
                    </MenuItemMui>
                    <MenuItemMui onClick={() => handleMenuAction("loan")}>
                      Wypożycz książkę
                    </MenuItemMui>
                    <MenuItemMui onClick={() => handleMenuAction("return")}>
                      Zwróć książkę
                    </MenuItemMui>
                    <MenuItemMui onClick={() => handleMenuAction("fine")}>
                      Dodaj grzywnę
                    </MenuItemMui>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openLoanDialog} onClose={handleCloseLoanDialog}>
        <DialogTitle>Wypożycz książkę</DialogTitle>
        <DialogContent>
          <TextField
            label="Wyszukaj książkę po tytule"
            value={bookSearchQuery}
            onChange={(e) => setBookSearchQuery(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleSearchBooks}
            color="primary"
            variant="contained"
          >
            Szukaj
          </Button>
          {books.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tytuł</TableCell>
                    <TableCell>Autorzy</TableCell>
                    <TableCell>Kategoria</TableCell>
                    <TableCell>Wybierz</TableCell>
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
                            color="primary"
                            variant="contained"
                            onClick={() => handleSelectBook(book)}>
                          Wybierz
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedBook && (
            <>
              <Typography variant="h6" gutterBottom>
                Kopie książki: {selectedBook.title}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID kopii</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Lokalizacja</TableCell>
                      <TableCell>Wybierz</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookCopies?.map((copy) => (
                      <TableRow key={copy.id} selected={selectedCopyId === copy.id}>
                        <TableCell>{copy.id}</TableCell>
                        <TableCell>{copyStatusMapper(copy?.status)}</TableCell>
                        <TableCell>{copy.location}</TableCell>
                        <TableCell>
                          {selectedCopyId === copy.id ?
                          <CheckCircleOutlineIcon color="primary" /> :
                          <Button
                            onClick={() => setSelectedCopyId(copy.id)}
                            color={copy.status === "BORROWED" ? "secondary" : "primary"}
                            disabled={copy.status === "BORROWED"}
                          >
                            Wybierz
                          </Button>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoanDialog}>Anuluj</Button>
          <Button onClick={handleLoanBook} disabled={!selectedCopyId}>
            Wypożycz
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openFineDialog} onClose={handleCloseFineDialog}>
        <DialogTitle>Dodaj grzywnę</DialogTitle>
        <DialogContent>
          <TextField
            label="Kwota"
            name="amount"
            value={fineDetails.amount}
            onChange={(e) =>
              setFineDetails({ ...fineDetails, amount: e.target.value })
            }
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Opis"
            name="description"
            value={fineDetails.description}
            onChange={(e) =>
              setFineDetails({ ...fineDetails, description: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFineDialog}>Anuluj</Button>
          <Button onClick={handleAddFine}>Dodaj</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
