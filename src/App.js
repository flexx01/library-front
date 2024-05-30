import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import NavigationMenu from "./components/NavigationMenu";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AdminPage from "./screens/AdminPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute"; // Import komponentu PrivateRoute

const drawerWidth = 240;
const miniDrawerWidth = 60;

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Header toggleDrawer={toggleDrawer} />
        <Box sx={{ display: "flex", mt: 8 }}>
          <NavigationMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              ml: drawerOpen ? `${drawerWidth}px` : `${miniDrawerWidth}px`,
              transition: (theme) =>
                theme.transitions.create("margin", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute role="ADMIN" />}>
                <Route path="/admin/*" element={<AdminPage />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
