import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import NavigationMenu from "./components/NavigationMenu";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AdminPage from "./screens/AdminPage";
import UserProfileEdit from "./screens/UserProfileEdit";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import PublicBookList from "./components/PublicBookList";
import LoanHistory from "./components/LoanHistory";
import Reservations from "./components/Reservations";
import UserLoans from "./components/UserLoans";
import UserFines from "./components/UserFines";
import AdminLoans from "./components/AdminLoans";
import AdminFines from "./components/AdminFines";
import NotFound from "./screens/NotFound";

const drawerWidth = 240;
const miniDrawerWidth = 60;

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
                <Route path="/:token" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books" element={<PublicBookList />} />
                <Route path="/history" element={<LoanHistory />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/profiledit" element={<UserProfileEdit />} />
                <Route element={<PrivateRoute requiredRole="ADMIN" />}>
                  <Route path="/admin/*" element={<AdminPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/profiledit" element={<UserProfileEdit />} />
                  <Route path="/user/loans" element={<UserLoans />} />
                  <Route path="/user/fines" element={<UserFines />} />
                  <Route path="/admin/*" element={<AdminPage />} />
                  <Route path="/admin/loans" element={<AdminLoans />} />
                  <Route path="/admin/fines" element={<AdminFines />} />
                </Route>
              </Routes>
          </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
