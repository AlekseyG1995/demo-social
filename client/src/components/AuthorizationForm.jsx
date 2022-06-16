import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Divider
} from "@mui/material";
import { Link } from 'react-router-dom';

export const AuthorizationForm = ({ toggleSignMode }) => {



  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Typography variant='h4' textAlign={'center'}>
          Welcome to <Typography variant='h4' component='span' sx={{ fontWeight: "bold" }}>demo-social</Typography>
        </Typography>
        <Box
          width='300px'
          mt={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mx: 'auto'

          }}>
          <TextField sx={{ mb: 1 }} id="username" autoFocus label="Username" />
          <TextField sx={{ mb: 1 }} id="password" type='password' label="Password" />
          <Button
            component="label"
            color="warning"
          >
            Forgot your password?

          </Button>

          <Button sx={{ mt: 5 }} size="small" color='secondary' onClick={toggleSignMode}
          >
            Don't have an account? Sign up

          </Button>
          <Button variant='contained'>
            sign in
          </Button>
        </Box>
      </Container>

    </>
  );
};


AuthorizationForm.propTypes = {
  toggleSignMode: PropTypes.func
};