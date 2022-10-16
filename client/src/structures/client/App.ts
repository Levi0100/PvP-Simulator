import { Client, ClientOptions } from 'eris'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'
import { Logger } from '..'

class App extends Client {
  commands: Map<string, any>

  constructor(token: string, options?: ClientOptions) {
    super(token, options)
    this.commands = new Map()
  }

  async init () {
    var modules = readdirSync('client/src/commands')
    modules.forEach(module => {
      var commands = readdirSync(`client/src/commands/${module}`)
      commands.forEach(async cmd => {
        const Command = await import(`../../commands/${module}/${cmd}`)
        const command = new Command.default(this)

        this.commands.set(command.name, command)
      })
    })

    var _modules = readdirSync('client/src/listeners')
    _modules.forEach(module => {
      var listeners = readdirSync(`client/src/listeners/${module}`)
      listeners.forEach(async listen => {
        const Listener = await import(`../../listeners/${module}/${listen}`)
        const listener = new Listener.default(this)

        this.on(listener.name, (...args) => listener.on(...args))
      })
    })

    await mongoose.connect(process.env.MONGO_URI!)
    Logger.warn('Database connected successfully')
    this.connect()
  }
}

const app = new App(process.env.TOKEN!, {
  allowedMentions: {
    everyone: false,
    roles: false,
    users: true,
    repliedUser: true
  },
  autoreconnect: true,
  defaultImageFormat: 'png',
  defaultImageSize: 4096,
  restMode: true,
  intents: ['all']
})

export default App
export {
  app
}