export class DataUserDTO {
  id
  age
  username
  avatar

  constructor(model) {
    this.id = model._id
    this.username = model.username
    this.age = new Date().getFullYear() - new Date(model.birthday).getFullYear()
    this.avatar = model.avatar
      ? new URL(`static/${model.avatar}`, process.env.API_URL)
      : ''
  }
}
