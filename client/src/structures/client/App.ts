import { Client, ClientOptions, } from 'eris'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'
import path from 'path'
import { Logger } from '..'

class App extends Client {
  commands: Map<string, any>

  constructor(token: string, options?: ClientOptions) {
    super(token, options)
    this.commands = new Map()
  }

  async init() {
    var commands = readdirSync(path.join(__dirname, '../../commands'))
    commands.forEach(async cmd => {
      const Command = await import(path.join(__dirname, `../../commands/${cmd}`))
      const command = new Command.default(this)

      this.commands.set(command.name, command)
    })

    var modules = readdirSync(path.join(__dirname, '../../listeners'))
    modules.forEach(module => {
      var listeners = readdirSync(path.join(__dirname, `../../listeners/${module}`))
      listeners.forEach(async listen => {
        const Listener = await import(path.join(__dirname, `../../listeners/${module}/${listen}`))
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