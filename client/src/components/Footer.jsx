import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material'

function Copyright() {
  return (
    <Typography textAlign='center' variant="body1" color="text.secondary">
      demo-social ©
      {new Date().getFullYear()}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Copyright />
    </Box>
  );
};

export {Footer};