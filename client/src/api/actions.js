import axios from 'axios'
import { logger } from '../../../server/src/utils/logger'
import { setPeople } from '../redux/actions/appData'
import { setAccountData, signIn, signOut } from '../redux/actions/auth'

class AuthApi {
  #host
  constructor(host = 'http://localhost:5005') {
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
        logger.debug('[API actions] = registration OK', res)
        alert('registration sucsessful!')
      } catch (e) {
        logger.debug('[API actions] = registration ERR', e)
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
        logger.debug('[API actions] = login OK')
      } catch (e) {
        logger.debug('[API actions] = login ERR')
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
          logger.debug('[API actions] = profile OK', res)
        } else {
          dispatch(signOut())
        }
      } catch (e) {
        dispatch(signOut())
        logger.debug('[API actions] = profile ERR', e)
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
        logger.debug('[API actions] = getData OK', res)
      } catch (e) {
        logger.debug('[API actions] = getData ERR', e)
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
            Authorization: `Bearer ${token}`,
          },
        })
        logger.debug('[API actions] = updata OK', res)
        alert('update successful')
      } catch (e) {
        logger.debug('[API actions] = udpate ERR')
        const expectedMsg = e?.response?.data?.message
        alert(expectedMsg ? expectedMsg : 'error')
      }
    }
  }
}

export const authApi = new AuthApi()
