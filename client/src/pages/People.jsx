import React from 'react';
import PeopleCardItem from '../components/PeopleCardItem';
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
  Divider
} from "@mui/material";
const People = () => {
  return (
    <Box>
      People page
      <PeopleCardItem/>
    </Box>
  );
};


export default People;