import { SET_PEOPLE_DATA } from "../consts"

const mockData = [
  {
    id: 1,
    name: "Alex",
    age: 10,
    avatar: null,
  },
  {
    id: 2,
    name: "Sasha",
    age: 20,
    avatar: null,
  },
  {
    id: 3,
    name: "Ivan",
    age: 25,
    avatar: null,
  },
  {
    id: 4,
    name: "Dima",
    age: 40,
    avatar: null,
  },
  {
    id: 5,
    name: "Max",
    age: 14,
    avatar: null,
  },
]

const initialState = {
  // people: []
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
