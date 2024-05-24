import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 60;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : miniDrawerWidth,
    overflowX: "hidden",
    top: "64px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "& .MuiDrawer-paperAnchorDockedLeft": {
    borderRight: "none",
  },
}));

const NavigationMenu = ({ open, toggleDrawer }) => {
  const drawerContent = (
    <List
      sx={{
        height: "calc(100% - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText sx={{ m: 0, whiteSpace: "nowrap" }} primary="Główna" />
        </ListItem>
        <Divider />
      </div>
      <div>
        <Divider />
        <ListItem>
          <ListItemText
            sx={{ m: 0, whiteSpace: "nowrap" }}
            primary={
              <>
                <Typography variant="body2">Godziny otwarcia:</Typography>
                <Typography variant="body2">Pon-Pt: 8:00 - 20:00</Typography>
                <Typography variant="body2">Sob: 10:00 - 14:00</Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            sx={{ m: 0, whiteSpace: "nowrap" }}
            primary={
              <Typography variant="body2">
                © 2024 Biblioteka Studentów
              </Typography>
            }
          />
        </ListItem>
      </div>
    </List>
  );

  const miniDrawerContent = (
    <List
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Tooltip title="Główna" placement="right">
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Divider />
      </div>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent" open={open}>
        {open ? drawerContent : miniDrawerContent}
      </StyledDrawer>
    </Box>
  );
};

export default NavigationMenu;
