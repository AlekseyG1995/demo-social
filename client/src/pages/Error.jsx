import React from 'react';
import {
  Typography,

  Button,
  Box
} from "@mui/material";
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <Container>
        <Typography mt={'1'} textAlign='center' variant='h3'>Похоже, произошла ошибка...</Typography>
        <Box mt={3} textAlign={'center'}>
          <Link to="/">
            <Button sx={{
              textDecorationLine: 'none' // BUG
            }} variant="contained">Вернуться на главную</Button>
          </Link>
        </Box>


      </Container>
    </div>
  );
};


export default Error;