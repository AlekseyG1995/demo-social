import * as React from "react"
import PropTypes from "prop-types"

import { Box, Avatar, IconButton, Typography, Card, CardContent } from "@mui/material/"

const PeopleCardItem = ({ username, age, avatar }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex">
          <Typography flexGrow={1} variant="h5" component="div">
            {username}
          </Typography>
          <IconButton disabled sx={{ p: 0 }}>
            <Avatar alt="Icon" src={avatar ? avatar : ""} />
          </IconButton>
        </Box>
        <Typography variant="body" color="text.secondary">
          {age}
        </Typography>
      </CardContent>
    </Card>
  )
}

PeopleCardItem.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  avatar: PropTypes.string,
}

PeopleCardItem.defaultProps = {
  avatar: "",
}

export default PeopleCardItem
