import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#8A2BE2",
        color: "white",
        textAlign: "center",
        p: 2,
        position: "fixed",
        bottom: 0,
      }}
    >
      <Typography variant="body1">
        Godziny otwarcia: Pon-Pt 8:00 - 20:00, Sob 10:00 - 14:00
      </Typography>
      <Typography variant="body2">© 2024 Biblioteka Studentów</Typography>
    </Box>
  );
};

export default Footer;
