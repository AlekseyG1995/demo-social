import { SIGNOUT, SIGNIN, SET_ACCOUNT_DATA } from "../consts"

export const signIn = () => ({ type: SIGNIN })
export const signOut = () => {
  localStorage.removeItem("token")
  return { type: SIGNOUT }
}

export const setAccountData = (accountData) => ({
  type: SET_ACCOUNT_DATA,
  payload: accountData,
})
