import React from 'react';
import {
  Outlet
} from 'react-router-dom'

import {
  Box,
  Typography,
  Container,
  Link,
  CssBaseline
} from '@mui/material'
import Footer from '../components/Footer';
import AppBarMenu from '../components/AppBarMenu';




const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBarMenu/>
      <CssBaseline />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default App;