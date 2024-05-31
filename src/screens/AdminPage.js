import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import UserTable from '../components/UserTable';
import UserEdit from '../components/UserEdit';
import UserAdd from '../components/UserAdd';
import PrivateRoute from '../context/PrivateRoute'; 

const AdminPage = () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <Box my={4}>
                    <Routes>
                        <Route element={<PrivateRoute role="ADMIN" />}>
                            <Route path="/" element={<UserTable />} />
                            <Route path="/user/:id" element={<UserEdit />} />
                            <Route path="/add-user" element={<UserAdd />} />
                        </Route>
                    </Routes>
                </Box>
            </Container>
        </>
    );
}

export default AdminPage;
