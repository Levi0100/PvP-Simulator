import { Schema, model } from 'mongoose'

const weapon = new Schema({
  _id: String,
  type: String,
  name: String,
  stars: Number,
  damage: Number
})

export default model('weapons', weapon)