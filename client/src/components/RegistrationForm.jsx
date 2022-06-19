import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Container,
  Grid
} from "@mui/material";
import ContactMailIcon from '@mui/icons-material/ContactMail';

export const RegistrationForm = ({ toggleSignMode }) => {

  const [regData, setRegData] = useState({
    username: '',
    email: '',
    password: '',
    birthday: '',
    gender: 'male',
    file: ''
  })

  useEffect(() => { // DEBUG
    console.log('regData, ', regData);
  }, [regData])

  return (
    <>
      <Typography variant='h4' textAlign={'center'}>
        Sign up <Typography variant='h4' component={'span'} sx={{ fontWeight: "bold" }}>demo-social</Typography>
      </Typography>
      <Container maxWidth="xs">
        <Box component="form" mt={3} >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                value={regData.username}
                fullWidth
                onChange={e => { setRegData({ ...regData, username: e.target.value }) }}
                sx={{ mb: 1 }}
                autoFocus
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={regData.email}
                onChange={e => { setRegData({ ...regData, email: e.target.value }) }}
                sx={{ mb: 1 }}
                type='email'
                label="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={regData.password}
                onChange={e => { setRegData({ ...regData, password: e.target.value }) }}
                sx={{ mb: 1 }}
                type='password'
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={regData.birthday}
                onChange={e => { setRegData({ ...regData, birthday: e.target.value }) }}
                sx={{ mb: 1 }}
                type='date'
                fullWidth
                label="" // BUG
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="gender-radio-buttons">Gender</FormLabel>
                <RadioGroup
                  row
                  defaultValue="male"
                  aria-labelledby="gender-radio-buttons"
                  name="gender-radio-buttons"
                  value={regData.gender}
                  onChange={e => { setRegData({ ...regData, gender: e.target.value }) }}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth component="label">
                Upload your avatar
                <input
                  type="file"
                  value={regData.file}
                  onChange={e => { setRegData({ ...regData, file: e.target.value }) }}
                  color='primary'
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button color='secondary'
                size='small'
                fullWidth
                sx={{ fontSize: '.75rem', mt: 5 }}
                onClick={() => toggleSignMode()}
              >
                Do you already have an account? Sign in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth endIcon={<ContactMailIcon />} variant='contained'>register</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

    </>
  )
}

RegistrationForm.propTypes = {
  toggleSignMode: PropTypes.func
};
