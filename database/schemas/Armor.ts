import { Schema, model } from 'mongoose'

const armor = new Schema({
  _id: String,
  star: Number,
  artifacts: Array
})

export default model('armors', armor)