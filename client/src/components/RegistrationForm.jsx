import React from 'react';
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
  const [currentGender, setCurrentGender] = React.useState('male');

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
          <FormControl>
            <TextField sx={{ mb: 1 }} id="username" autoFocus label="Username" />
            <TextField sx={{ mb: 1 }} id="email" type='email' label="Email" />
            <TextField sx={{ mb: 1 }} id="password" type='password' label="Password" />
            <TextField sx={{ mb: 1 }} id="birthday" defaultValue='' type='date' label="" />
            <FormControl>
              <FormLabel id="gender-radio-buttons">Gender</FormLabel>
              <RadioGroup
                row
                defaultValue="male"
                aria-labelledby="gender-radio-buttons"
                name="gender-radio-buttons"
                value={currentGender}
                onChange={setCurrentGender}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

          </FormControl>
          <Button
            // variant="contained"
            component="label"
          >
            Upload your avatar
            <input
              type="file"
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
