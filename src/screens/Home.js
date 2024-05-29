import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Witamy w Bibliotece Studentów</Typography>
      {user ? (
        <Typography variant="body1">
          Cześć, {user.firstName}! Znajdziesz tutaj wszystkie zasoby potrzebne
          do nauki i badań.
        </Typography>
      ) : (
        <Typography variant="body1">
          Tutaj znajdziesz wszystkie zasoby potrzebne do nauki i badań.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
