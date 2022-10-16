import c from 'colors'
import moment from 'moment'
import App from '../client/App'

export default class Logger {
  private client: App

  constructor(client: App) {
    this.client = client
  }
  static send(message: string) {
    return console.log(c.green(`[${moment(Date.now()).format('hh:mm')}] ${message}`))
  }
  static warn(message: string) {
    return console.log(c.yellow(`[${moment(Date.now()).format('hh:mm')}] ${message}`))
  }
}