import React, {useContext, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useParams } from 'react-router';

const Home = () => {
  const { user, login } = useContext(AuthContext);
  const params = useParams();
    useEffect(() => {
        if(params?.token) {
            login(params)
        }
    }, []);


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Witamy w Bibliotece Studentów</Typography>
      {user || params?.token ? (
        <Typography variant="body1">
          Cześć, {user?.firstName}! Znajdziesz tutaj wszystkie zasoby potrzebne
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
