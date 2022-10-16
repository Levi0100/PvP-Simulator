import { App, Listener, Logger } from '../../structures'

export default class ReadyListener extends Listener {
  constructor (client: App) {
    super({
      name: 'ready',
      client
    })
  }

  async on () {
    Logger.send(`Logged as ${this.client?.user.username}#${this.client?.user.discriminator}`)

    const commands: any[] = []
    this.client?.commands.forEach(cmd => {
      commands.push({
        name: cmd.name,
        name_localizations: cmd.name_localizations,
        description: cmd.description,
        description_localizations: cmd.description_localizations,
        options: cmd.options
      })
    })
    this.client?.bulkEditCommands(commands)
  }
}