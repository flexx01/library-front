import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box
      sx={{
        p: 3,
        m: 10,
        border: "1px solid",
        borderRadius: "18px",
        borderColor: "rgba(0,0,0, 0.12)",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            width: { xs: "100%", sm: "auto" },
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}
        >
          <Tab label="Zaloguj się" />
          <Tab label="Zarejestruj się" />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <Box>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Zaloguj się
          </Typography>
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Hasło" type="password" margin="normal" />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Zaloguj się
          </Button>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Zarejestruj się
          </Typography>
          <TextField fullWidth label="Email" margin="normal" />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Imię" margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nazwisko" margin="normal" />
            </Grid>
          </Grid>
          <TextField fullWidth label="Numer telefonu" margin="normal" />
          <TextField fullWidth label="Hasło" type="password" margin="normal" />
          <TextField
            fullWidth
            label="Potwierdź hasło"
            type="password"
            margin="normal"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Zarejestruj się
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Login;
