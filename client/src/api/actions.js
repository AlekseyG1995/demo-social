import { API_URL } from '../config'
import { setPeople } from '../redux/actions/appData'
import { setAccountData, signIn, signOut } from '../redux/actions/auth'
import { AuthService } from '../services/AuthService.js'
import { UserService } from '../services/UserService'

class AuthApi {
  #host
  constructor(host) {
    this.#host = host
  }

  registraton(formData) {
    return async (dispatch) => {
      try {
        const res = await AuthService.registration(formData)
        console.log('[API actions] = registration OK', res)
        alert('registration sucsessful!')
      } catch (e) {
        console.log('[API actions] = registration ERR', e)
        const expectedMsg = e?.response?.data?.message
        alert(expectedMsg ? expectedMsg : 'error')
      }
    }
  }

  login(formData) {
    return async (dispatch) => {
      try {
        const res = await AuthService.login(formData)
        localStorage.setItem('token', res?.data?.accessToken)
        dispatch(signIn())
        console.log('[API actions] = login OK')
      } catch (e) {
        console.log('[API actions] = login ERR', e)
        const expectedMsg = e?.response?.data?.message
        alert(expectedMsg ? expectedMsg : 'error')
      }
    }
  }

  logout() {
    return async (dispatch) => {
      await AuthService.logout()
      dispatch(signOut())
    }
  }

  profile() {
    return async (dispatch) => {
      try {
        const res = await AuthService.getProfile()
        dispatch(setAccountData(res.data))
        console.log('[API actions] = profile OK', res)
      } catch (e) {
        dispatch(signOut())
        console.log('[API actions] = profile ERR', e)
      }
    }
  }

  getData() {
    return async (dispatch) => {
      try {
        const res = await UserService.fetchUsers()
        dispatch(setPeople(res.data))
        console.log('[API actions] = getData OK', res)
      } catch (e) {
        console.log('[API actions] = getData ERR', e)
        // const expectedMsg = e?.response?.data?.message
        // alert(expectedMsg ? expectedMsg : "error")
      }
    }
  }

  update(formData) {
    return async (dispatch) => {
      try {
        const res = await AuthService.updateAccount(formData)
        console.log('[API actions] = updata OK', res.data.user)
        dispatch(setAccountData(res.data.user))
        alert('update successful')
      } catch (e) {
        console.log('[API actions] = udpate ERR', e)
        const expectedMsg = e?.response?.data?.message
        alert(expectedMsg ? expectedMsg : 'error')
      }
    }
  }
}
export const authApi = new AuthApi(API_URL)
