import PropTypes from 'prop-types'
import { Typography, Grid, Box } from '@mui/material'
import PeopleCardItem from './PeopleCardItem'

const PeopleCardList = ({ people }) => {
  return (
    <Box mt={3}>
      {people.length ? (
        <Grid container rowSpacing={3} columnSpacing={10}>
          {people.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <PeopleCardItem
                id={item.id}
                username={item.username}
                age={item.age}
                avatar={item.avatar}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">Empty list...</Typography>
      )}
    </Box>
  )
}

PeopleCardList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string,
    })
  ),
}

PeopleCardList.defaultProps = {
  people: [],
}

export default PeopleCardList
