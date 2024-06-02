// src/components/AdminNavBar.js
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white', // Biały kolor tła
        padding: 2,
        marginBottom: 3,
        borderRadius: '4px',
        position: 'relative'
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate('/admin')}
        sx={{
          marginRight: 2, // Odstęp między przyciskami
          color: 'black',
          borderBottom: isActive('/admin') ? '2px solid #3f51b5' : 'none', // Podkreślenie tylko tekstu na niebiesko
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        Zarządzaj użytkownikami
      </Button>
      <Box
        sx={{
          width: '2px',
          height: '40px',
          backgroundColor: 'white',
          position: 'absolute',
          left: 'calc(50% - 1px)',
          transform: 'rotate(45deg)',
          zIndex: 0
        }}
      />
      <Button
        variant="text"
        onClick={() => navigate('/admin/books')}
        sx={{
          color: 'black',
          borderBottom: isActive('/admin/books') ? '2px solid #3f51b5' : 'none', // Podkreślenie tylko tekstu na niebiesko
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        Zarządzaj książkami
      </Button>
    </Box>
  );
};

export default AdminNavBar;
