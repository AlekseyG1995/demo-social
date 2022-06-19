import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Alert,
  Snackbar,
  Grid
} from "@mui/material";

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
      <Typography variant='h4' textAlign={'center'}>
        Welcome to <Typography variant='h4' component='span' sx={{ fontWeight: "bold" }}>demo-social</Typography>
      </Typography>
      <Container maxWidth="xs">
        <Box mt={3} component="form">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                value={authData.username}
                onChange={e => { setAuthData({ ...authData, username: e.target.value }) }}
                sx={{ mb: 1 }}
                autoFocus
                fullWidth
                label="Username"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={authData.password}
                onChange={e => { setAuthData({ ...authData, password: e.target.value }) }}
                sx={{ mb: 1 }}
                fullWidth
                type='password'
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                fullWidth
                color="warning"
                onClick={() => setIsOpenSnack(true)}
              >
                Forgot your password?
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth sx={{ mt: 5 }} size="small" color='secondary' onClick={toggleSignMode}
              >
                Don't have an account? Sign up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant='contained'>
                sign in
              </Button>
            </Grid>
          </Grid>
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