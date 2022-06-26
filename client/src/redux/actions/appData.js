import { SET_PEOPLE_DATA } from '../consts'

export const setPeople = (peopleData) => ({
  type: SET_PEOPLE_DATA,
  payload: peopleData,
})
