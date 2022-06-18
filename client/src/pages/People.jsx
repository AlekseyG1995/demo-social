import React from 'react';
import PeopleCardItem from '../components/People/PeopleCardItem';
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
import PeopleCardList from '../components/People/PeopleCardList';

const mockData = [
  {
    id: 1,
    name: 'Alex',
    age: 10,
    avatar: null
  },
  {
    id: 2,
    name: 'Sasha',
    age: 20,
    avatar: null
  },
  {
    id: 3,
    name: 'Ivan',
    age: 25,
    avatar: null
  },
  {
    id: 4,
    name: 'Dima',
    age: 40,
    avatar: null
  },
  {
    id: 5,
    name: 'Max',
    age: 14,
    avatar: null
  }
]

const People = () => {
  return (
    <Box>
      <Typography variant='h2' textAlign="center">People page</Typography>
      <Divider/>
      <PeopleCardList people={mockData} />
    </Box>
  );
};


export default People;