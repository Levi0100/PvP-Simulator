import { Schema, model } from 'mongoose'

const user = new Schema({
  _id: String,
  locale: {
    type: String,
    default: 'en'
  },
  granex: {
    type: Number,
    default: 0
  },
  refinedGranex: {
    type: Number,
    default: 0
  },
  dailyTime: {
    type: Number,
    default: 0
  },
  inventory: {
    weapons: {
      type: Array,
      default: []
    },
    armors: {
      type: Array,
      default: []
    }
  },
  inUse: {
    helmet: Object,
    chest: Object,
    pants: Object,
    boots: Object,
    weapon: Object
  },
  getTime: {
    type: Number,
    default: 0
  },
  battling: Boolean,
  energy: {
    type: Number,
    default: 500
  },
  inMatch: Boolean,
  background: String,
  wins: {
    type: Number,
    default: 0
  },
  defeats: {
    type: Number,
    default: 0
  },
  alreadySentBackground: Boolean
})

export default model('users', user)