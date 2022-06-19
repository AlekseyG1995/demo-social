import { SIGNOUT, SIGNIN } from "../consts"

export const signIn = () => ({ type: SIGNIN, })
export const signOut = () => ({ type: SIGNOUT })