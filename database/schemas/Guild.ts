import { Schema, model } from 'mongoose'

const guild = new Schema({
  _id: String,
  locale: {
    type: String,
    default: 'en'
  },
  plan: String,
  allowedChannels: {
    type: Array,
    default: []
  }
})

export default model('guilds', guild)