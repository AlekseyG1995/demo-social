import { myAxios } from '../api/axios'
export class AuthService {
  static async login(formData) {
    return myAxios.post('/login', formData)
  }

  static async registration(formData) {
    return myAxios.post('/registration', formData)
  }

  static async logout() {
    return myAxios.post('/logout')
  }
  static getProfile() {
    return myAxios.get('/profile')
  }

  static updateAccount(formData) {
    return myAxios.put('/account', formData)
  }
}
