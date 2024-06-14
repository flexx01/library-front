import React, { useContext } from "react";
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
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PaymentsIcon from '@mui/icons-material/Payments';
import BookIcon from "@mui/icons-material/Book"; // Ikona dla przeglądania książek
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; // Ikona dla panelu admina
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
  const { user } = useContext(AuthContext);

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
        {user && user.role !== "ADMIN" && (
          <>
            <ListItem button component={Link} to="/books">
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ m: 0, whiteSpace: "nowrap" }}
                primary="Przeglądaj Książki"
              />
            </ListItem>
            {user.role === "USER" &&
                <>
                  <Divider />
                  <ListItem button component={Link} to="/history">
                    <ListItemIcon>
                      <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m: 0, whiteSpace: "nowrap" }}
                        primary="Historia wypożyczeń"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button component={Link} to="/user/fines">
                    <ListItemIcon>
                      <PaymentsIcon />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m: 0, whiteSpace: "nowrap" }}
                        primary="Grzywny"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button component={Link} to="/reservations">
                    <ListItemIcon>
                      <BookmarkAddedIcon />
                    </ListItemIcon>
                    <ListItemText
                        sx={{ m: 0, whiteSpace: "nowrap" }}
                        primary="Rezerwacje"
                    />
                  </ListItem>
                </>
            }
            <Divider />
          </>
        )}

        {user && user.role === "ADMIN" && (
          <>
            <ListItem button component={Link} to="/admin">
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ m: 0, whiteSpace: "nowrap" }}
                primary="Panel Admina"
              />
            </ListItem>
            <Divider />
          </>
        )}
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
        {user && user.role !== "ADMIN" && (
          <>
            <Tooltip title="Przeglądaj Książki" placement="right">
              <ListItem button component={Link} to="/books">
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            {user.role === "USER" &&
                <>
                  <Divider />
                  <Tooltip title="Hisoria wypożyczeń" placement="right">
                  <ListItem button component={Link} to="/history">
                    <ListItemIcon>
                      <HistoryIcon />
                    </ListItemIcon>
                  </ListItem>
                  </Tooltip>
                  <Divider />
                  <Tooltip title="Rezerwacje" placement="right">
                    <ListItem button component={Link} to="/reservations">
                      <ListItemIcon>
                        <BookmarkAddedIcon />
                      </ListItemIcon>
                    </ListItem>
                  </Tooltip>
                  <Divider />
                  <Tooltip title="Grzywny" placement="right">
                    <ListItem button component={Link} to="/user/fines">
                      <ListItemIcon>
                        <PaymentsIcon />
                      </ListItemIcon>
                    </ListItem>
                  </Tooltip>
                  <Divider />
                  </>
                  }
            <Divider />
          </>
        )}

        {user && user.role === "ADMIN" && (
          <>
            <Tooltip title="Panel Admina" placement="right">
              <ListItem button component={Link} to="/admin">
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Divider />
          </>
        )}
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
