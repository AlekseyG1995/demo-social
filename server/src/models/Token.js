import mongoose from 'mongoose'
const { Schema, model } = mongoose

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, require: true },
})

export const tokenModel = model('Token', tokenSchema)
