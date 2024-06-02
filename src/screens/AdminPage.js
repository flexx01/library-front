import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import UserTable from '../components/UserTable';
import UserEdit from '../components/UserEdit';
import UserAdd from '../components/UserAdd';
import BookManagement from '../components/BookManagment';
import BookEdit from '../components/BookEdit'; 
import PrivateRoute from '../context/PrivateRoute';
import AdminNavBar from '../components/AdminNavBar'; 
import BookAdd from '../components/BookAdd'
import BookCopies from '../components/BookCopies'
import CopyEdit from '../components/CopyEdit';
const AdminPage = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box my={4}>
          <AdminNavBar /> 
          <Routes>
            <Route element={<PrivateRoute role="ADMIN" />}>
              <Route path="/" element={<UserTable />} />
              <Route path="/user/:id" element={<UserEdit />} />
              <Route path="/add-user" element={<UserAdd />} />
              <Route path="/books" element={<BookManagement />} /> 
              <Route path="/books/:id" element={<BookEdit />} /> 
              <Route path="/add-book" element={<BookAdd />} />
              <Route path="/books/:id/copies" element={<BookCopies />} />
              <Route path="/books/:id/copies/:copyId/edit" element={<CopyEdit />} />
            </Route>
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default AdminPage;
