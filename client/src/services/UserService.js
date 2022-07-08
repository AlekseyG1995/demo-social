import { myAxios } from '../api/axios'

export class UserService {
  static fetchUsers() {
    return myAxios.get('/data')
  }
}
