import { App, CommandRunner, Listener } from '../../structures'
import { CommandInteraction } from 'eris'
import { Guild } from '../../../../database'

export default class InteractionCreateListener extends Listener {
  constructor (client: App) {
    super({
      name: 'interactionCreate',
      client
    })
  }

  async on (interaction: CommandInteraction) {
    if (!interaction.member) return

    const guild = await Guild.findById(interaction.guildID) || new Guild({
      _id: interaction.guildID
    })

    new CommandRunner(this.client!, interaction, guild.locale).init()

    guild.save()
  }
}