import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Box, Divider } from "@mui/material"
import PeopleCardList from "../components/People/PeopleCardList"
import { signIn } from "../redux/actions/auth"
import { useEffect } from "react"
import { authApi } from "../api/actions"

const People = () => {
  const dataPeople = useSelector((state) => state.data.people)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authApi.getData())
  }, [])

  return (
    <Box>
      <Typography variant="h2" textAlign="center">
        People page
      </Typography>
      <Divider />
      <PeopleCardList people={dataPeople} />
    </Box>
  )
}

export default People
