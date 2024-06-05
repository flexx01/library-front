import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        404 - Strona nieznaleziona
      </Typography>
      <Typography variant="body1">
        Strona której szukasz nie istnieje. Przejdź do{" "}
        <Link to="/">strony głównej</Link>.
      </Typography>
    </Box>
  );
};

export default NotFound;
