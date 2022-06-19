import { SIGNIN, SIGNOUT } from "../consts"

const initialState = {
  isAuth: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, isAuth: true }
    case SIGNOUT:
      return { ...state, isAuth: false }
    default: return state
  }
}