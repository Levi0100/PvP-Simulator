import { Schema, model } from 'mongoose'

const weapon = new Schema({
  _id: String,
  star: Number,
  artifacts: Array
})

export default model('weapons', weapon)