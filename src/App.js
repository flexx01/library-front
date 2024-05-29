import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import Login from './screens/Login';
import UserTable from './components/UserTable';
import UserEdit from './components/UserEdit'; // Import UserEdit
import UserAdd from './components/UserAdd';


function App() {
    return (
        <Router>
            <CssBaseline />
            <Container>
                <Box my={4}>
                    <Routes>
                        <Route path="/login" element={<Login />} />  
                        <Route path="/" element={<UserTable />} />
                        <Route path="/users" element={<UserTable />} /> {/* Add Route for UserTable */}
                        <Route path="/user/:id" element={<UserEdit />} /> {/* Add Route for UserEdit */}
                        <Route path="/add-user" element={<UserAdd />} /> {/* Route for UserAdd */}
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;


