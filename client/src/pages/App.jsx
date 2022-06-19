import React from 'react';
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { Footer } from '../components/Footer';
import AppBarMenu from '../components/AppBarMenu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { cyan, deepPurple } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: cyan[700],
    },
    secondary:{
      main: deepPurple[500]
    }
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;