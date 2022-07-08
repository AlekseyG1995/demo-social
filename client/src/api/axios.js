import axios from 'axios'
import { API_URL } from '../config'

export const myAxios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})
myAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers['Content-Type'] = 'multipart/form-data'
  return config
})

myAxios.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalReq = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRerty
    ) {
      originalReq._isRerty = true
      try {
        const response = await axios.get(`${API_URL}refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return myAxios.request(originalReq)
      } catch (error) {
        console.warn('Not Authorized')
      }
    }
    throw error
  }
)
