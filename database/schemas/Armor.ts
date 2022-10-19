import { Schema, model } from 'mongoose'

const armor = new Schema({
  _id: String,
  type: String,
  name: String,
  stars: Number,
  def: Number
})

export default model('armors', armor)