import { Schema, model } from 'mongoose'

const user = new Schema({
  _id: String,
  granex: {
    type: Number,
    default: 0
  }
})

export default model('users', user)