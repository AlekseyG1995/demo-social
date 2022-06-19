import React from 'react';
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { Footer } from '../components/Footer';
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
      <AppBarMenu />
      <Box my={5}>
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;