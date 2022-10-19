import { Schema, model } from 'mongoose'

const user = new Schema({
  _id: String,
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
      type: Array<Object>,
      default: []
    },
    armors: {
      type: Array<Object>,
      default: []
    }
  }
})

export default model('users', user)