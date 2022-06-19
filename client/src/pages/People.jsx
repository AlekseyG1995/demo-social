import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Box,
  Divider
} from "@mui/material";
import PeopleCardList from '../components/people/PeopleCardList';
import { signIn } from '../redux/actions/auth';

const People = () => {
  const dataPeople = useSelector(state => state.data.people)
  // const dispatch = useDispatch()
  // dispatch(signIn())

  return (
    <Box>
      <Typography variant='h2' textAlign="center">People page</Typography>
      <Divider />
      <PeopleCardList people={dataPeople} />
    </Box>
  );
};


export default People;