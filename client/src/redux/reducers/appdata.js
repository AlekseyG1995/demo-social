import { SET_PEOPLE_DATA } from '../consts'

const initialState = {
  people: [],
}

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PEOPLE_DATA:
      return { ...state, people: action.payload }
    default:
      return state
  }
}
