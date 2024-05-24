import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Header = ({ toggleDrawer }) => {
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Biblioteka Studentów
        </Typography>
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
        >
          Zaloguj się
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
