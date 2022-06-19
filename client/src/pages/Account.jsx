import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Box,
  Grid,
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
        <Box mt={3} component="form">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                value={accountData.username}
                onChange={e => { setAccountData({ ...accountData, username: e.target.value }) }}
                sx={{ mb: 1 }}
                autoFocus
                fullWidth
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={accountData.password}
                onChange={e => { setAccountData({ ...accountData, password: e.target.value }) }}
                sx={{ mb: 1 }}
                fullWidth
                type='password'
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth component="label">
                Upload your avatar
                <input
                  type="file"
                  value={accountData.file}
                  onChange={e => { setAccountData({ ...accountData, file: e.target.value }) }}
                  color='primary'
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 5 }}>
              <Button fullWidth variant='contained'>
                save changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};


export default Account;