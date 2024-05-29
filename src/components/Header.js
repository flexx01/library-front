import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = ({ toggleDrawer }) => {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#8A2BE2",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Biblioteka Studentów
        </Typography>
        {user ? (
          <>
            <Button
              color="inherit"
              startIcon={<AccountCircleOutlinedIcon />}
              sx={{
                border: "1px solid white",
                borderRadius: "8px",
                padding: "6px 12px",
                textTransform: "none",
                lineHeight: "normal",
              }}
              onClick={handleMenuClick}
            >
              {user.firstName}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
              {/* Add more menu items as needed */}
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            startIcon={<AccountCircleOutlinedIcon />}
            sx={{
              border: "1px solid white",
              borderRadius: "8px",
              padding: "6px 12px",
              textTransform: "none",
              lineHeight: "normal",
            }}
            component={Link}
            to="/login"
          >
            Zaloguj się
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
