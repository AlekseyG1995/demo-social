import axios from 'axios'
import { API_URL } from '../config'
import { setPeople } from '../redux/actions/appData'
import { setAccountData, signIn, signOut } from '../redux/actions/auth'

class AuthApi {
  #host
  constructor(host) {
    this.#host = host
  }

  registraton(formData) {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          `${this.#host}/api/registration`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
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
        const res = await axios.post(`${this.#host}/api/login`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        localStorage.setItem('token', res?.data?.token)
        dispatch(signIn())
        console.log('[API actions] = login OK')
      } catch (e) {
        console.log('[API actions] = login ERR')
        const expectedMsg = e?.response?.data?.message
        alert(expectedMsg ? expectedMsg : 'error')
      }
    }
  }

  profile() {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const res = await axios.get(`${this.#host}/api/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          dispatch(setAccountData(res.data))
          console.log('[API actions] = profile OK', res)
        } else {
          dispatch(signOut())
        }
      } catch (e) {
        dispatch(signOut())
        console.log('[API actions] = profile ERR', e)
      }
    }
  }

  getData() {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${this.#host}/api/data`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(setPeople(res.data.people))
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
        const token = localStorage.getItem('token')
        const res = await axios.put(`${this.#host}/api/account`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // eslint-disable-next-line quote-props
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('[API actions] = updata OK', res)
        alert('update successful')
      } catch (e) {
        console.log('[API actions] = udpate ERR')
        const expectedMsg = e?.response?.data?.message
        alert(expectedMsg ? expectedMsg : 'error')
      }
    }
  }
}
const apiURL = process.env.API_URL || API_URL
export const authApi = new AuthApi(apiURL)
