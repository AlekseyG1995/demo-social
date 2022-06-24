import { SET_ACCOUNT_DATA, SIGNIN, SIGNOUT } from "../consts"

const initialState = {
  isAuth: false,
  // object(username,avatar)||null
  accountData: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, isAuth: true }
    case SIGNOUT:
      return { ...state, isAuth: false, accountData: null }
    case SET_ACCOUNT_DATA:
      return {
        ...state,
        accountData: action.payload,
      }

    default:
      return state
  }
}
