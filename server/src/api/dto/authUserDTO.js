export class AuthUserDTO {
  id
  isActivated
  username
  avatar

  constructor(model) {
    this.id = model._id
    this.username = model.username
    this.isActivated = model.isActivated
    this.avatar = new URL(`static/${model.avatar}`, process.env.API_URL)
  }
}
