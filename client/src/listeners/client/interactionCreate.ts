import { ComponentInteraction } from 'eris'
import { User } from '../../../../database'
import { App, Listener, Logger } from '../../structures'

export default class InteractionCreateListener extends Listener {
  constructor (client: App) {
    super({
      name: 'interactionCreate',
      client
    })
  }

  async on (interaction: ComponentInteraction) {
    if (!interaction.data.custom_id) return

    const user = await User.findById(interaction.message.embeds[0].footer?.text)
    const _user = await this.client?.getRESTUser(user?.id)
    await interaction.defer(64)

    switch (interaction.data.custom_id) {
      case 'approve': {
        user!.background = interaction.message.embeds[0].image?.url
        user!.alreadySentBackground = false
        await user?.save()

        await interaction.createMessage(`Background of \`${_user?.username}#${_user?.discriminator} (${_user?.id})\` has been approved successfully`)

        _user?.getDMChannel()
        .then(async dm => {
          await dm.createMessage('Your background has been approved. Use </profile:1040407428816179200> to see it.')
        })
        .catch(error => new Logger(this.client!).error(error))

        interaction.message.delete()
      }
      break
      case 'reprove': {
        user!.alreadySentBackground = false
        await user?.save()

        await interaction.createMessage(`Background of \`${_user?.username}#${_user?.discriminator} (${_user?.id})\` has been reproved successfully`)

        _user?.getDMChannel()
        .then(async dm => {
          await dm.createMessage('Your background has been reproved. Perhaps your background had a possible NSFW or offensive content.')
        })
        .catch(console.error)

        interaction.message.delete()
      }
    }
  }
}