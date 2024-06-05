import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 2,
        marginBottom: 3,
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <Tabs
        value={location.pathname}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label="Zarządzaj użytkownikami" value="/admin" />
        <Tab label="Zarządzaj książkami" value="/admin/books" />
      </Tabs>
    </Box>
  );
};

export default AdminNavBar;
