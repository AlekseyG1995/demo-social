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
  Alert,
  Snackbar,
  Divider
} from "@mui/material";
import { Link } from 'react-router-dom';

export const AuthorizationForm = ({ toggleSignMode }) => {

  const [isOpenSnack, setIsOpenSnack] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnack(false)
  }

  const [authData, setAuthData] = useState({
    username: '',
    password: ''
  })


  useEffect(() => { // DEBUG
    console.log('authData, ', authData);
  }, [authData])

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
          <TextField
            value={authData.username}
            onChange={e => { setAuthData({ ...authData, username: e.target.value }) }}
            sx={{ mb: 1 }}
            autoFocus
            label="Username"
          />
          <TextField
            value={authData.password}
            onChange={e => { setAuthData({ ...authData, password: e.target.value }) }}
            sx={{ mb: 1 }}
            type='password'
            label="Password"
          />
          <Button
            component="label"
            color="warning"
            onClick={() => setIsOpenSnack(true)}
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
      <Snackbar open={isOpenSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
         Ooops, it's not implemented yet)
        </Alert>
      </Snackbar>
    </>
  );
};


AuthorizationForm.propTypes = {
  toggleSignMode: PropTypes.func
};