import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Witamy w Bibliotece Studentów</Typography>
      <Typography variant="body1">
        Tutaj znajdziesz wszystkie zasoby potrzebne do nauki i badań.
      </Typography>
    </Box>
  );
};

export default Home;
