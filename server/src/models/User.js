import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  avatar: String,
})

export const User = model('User', UserSchema)
