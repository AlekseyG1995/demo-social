import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Box
} from '@mui/material';


const Error = () => {
  return (
    <div>
      <Typography mt={'1'} textAlign='center' variant='h3'>
        An error has occurred
      </Typography>
      <Box mt={3} textAlign={'center'}>
        <Button
          component={Link} to="/" variant="contained">Go back to the main page
        </Button>
      </Box>
    </div>
  );
};

export default Error;