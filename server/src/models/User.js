import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  birthday: { type: Date, required: true },
  isActivated: { type: Boolean, default: false },
  avatar: String,
  activationLink: String,
})

export const userModel = model('User', UserSchema)
