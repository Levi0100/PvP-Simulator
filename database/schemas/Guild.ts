import { Schema, model } from 'mongoose'

const guild = new Schema({
  _id: String,
  locale: {
    type: String,
    default: 'en'
  },
  plan: String
})

export default model('guilds', guild)