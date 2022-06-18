import React, { useEffect, useState } from 'react';
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
import ContactMailIcon from '@mui/icons-material/ContactMail';
// import BadgeIcon from '@mui/icons-material/Badge';

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
      <Container sx={{ mt: 10 }}>
        <Typography variant='h4' textAlign={'center'}>
          Sign up <Typography variant='h4' component={'span'} sx={{ fontWeight: "bold" }}>demo-social</Typography>
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
            value={regData.username}
            onChange={e => { setRegData({ ...regData, username: e.target.value }) }}
            sx={{ mb: 1 }}
            id="username"
            autoFocus
            label="Username"
          />
          <TextField
            value={regData.email}
            onChange={e => { setRegData({ ...regData, email: e.target.value }) }}
            sx={{ mb: 1 }}
            id="email"
            type='email'
            label="Email"
          />
          <TextField
            value={regData.password}
            onChange={e => { setRegData({ ...regData, password: e.target.value }) }}
            sx={{ mb: 1 }}
            id="password"
            type='password'
            label="Password"
          />
          <TextField
            value={regData.birthday}
            onChange={e => { setRegData({ ...regData, birthday: e.target.value }) }}
            sx={{ mb: 1 }}
            id="birthday"
            type='date'
            // placeholder='1'
            label="" // BUG
          />
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


          <Button
            // variant="contained"
            component="label"
          >
            Upload your avatar
            <input
              type="file"
              value={regData.file}
              onChange={e => { setRegData({ ...regData, file: e.target.value }) }}
              color='primary'
              hidden
            />
          </Button>
          <Button color='secondary'
            size='small'
            sx={{ fontSize: '.75rem', mt: 5 }}
            onClick={() => toggleSignMode()}
          >
            Do you already have an account? Sign in

          </Button>
          <Button endIcon={<ContactMailIcon />} variant='contained'>register</Button>
        </Box>
      </Container>

      
    </>
  )
}


RegistrationForm.propTypes = {
  toggleSignMode: PropTypes.func
};
