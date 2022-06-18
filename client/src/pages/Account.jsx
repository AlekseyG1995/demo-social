import React, { useState, useEffect } from 'react';
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
  Alert,
  Snackbar,
  Divider,
  Container
} from "@mui/material";

const Account = () => {


  const [accountData, setAccountData] = useState({
    username: '',
    password: '',
    file: ''
  })


  useEffect(() => { // DEBUG
    console.log('authData, ', accountData);
  }, [accountData])

  return (
    <div>
      <Typography variant='h4' textAlign={'center'}>
        Edit your account
      </Typography>
      <Container maxWidth="xs">
        <Box
          mt={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',

          }}>
          <TextField
            value={accountData.username}
            onChange={e => { setAccountData({ ...accountData, username: e.target.value }) }}
            sx={{ mb: 1 }}
            autoFocus
            label="Username"
          />
          <TextField
            value={accountData.password}
            onChange={e => { setAccountData({ ...accountData, password: e.target.value }) }}
            sx={{ mb: 1 }}
            type='password'
            label="Password"
          />

          <Button
            // variant="contained"
            component="label"
          >
            change avatar
            <input
              type="file"
              value={accountData.file}
              onChange={e => { setAccountData({ ...accountData, file: e.target.value }) }}
              color='primary'
              hidden
            />
          </Button>

          {/* <Typography>-CARD WITH UPLOAD-</Typography> */}



          <Button variant='contained' sx={{ mt: 5 }}>
            Save changes
          </Button>
        </Box>
      </Container>
    </div>
  );
};


export default Account;