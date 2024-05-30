import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { AuthContext } from '../context/AuthContext';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users/all');
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/users?id=${selectedUser}`);
      setUsers(users.filter(user => user.id !== selectedUser));
      setOpen(false);
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleClickOpen = (id) => {
    setSelectedUser(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = () => {
    if (user && user.role === 'ADMIN') {
      navigate('/admin/add-user');
    } else {
      console.error('Unauthorized');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Użytkownicy
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
        >
          Dodaj użytkownika
        </Button>
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
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/user/${user.id}`)}
                  >
                    Edytuj
                  </Button>
                </TableCell>
                <TableCell>
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
