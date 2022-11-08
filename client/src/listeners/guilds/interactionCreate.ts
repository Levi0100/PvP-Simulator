import { App, CommandRunner, Listener } from '../../structures'
import { CommandInteraction } from 'eris'
import { User } from '../../../../database'

export default class InteractionCreateListener extends Listener {
  constructor (client: App) {
    super({
      name: 'interactionCreate',
      client
    })
  }

  async on (interaction: CommandInteraction) {
    if (!interaction.member) return
    if (!interaction.data.name) return

    const user = await User.findById(interaction.member.id) || new User({
      _id: interaction.member.id
    })

    new CommandRunner(this.client!, interaction, user.locale).init()
  }
}