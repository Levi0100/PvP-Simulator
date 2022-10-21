import { User } from '../../../../database'
import { App, Command, CommandContext } from '../../structures'

interface CommandOptions {
  name?: string
  value?: string
  type?: number
  options?: any[]
}

export default class GranexCommand extends Command {
  constructor (client: App) {
    super({
      name: 'granex',
      description: 'Shows your granex or another player granex',
      description_localizations: {
        'pt-BR': 'Mostra o seu granex ou o granex de outro jogador'
      },
      options: [
        {
          type: 6,
          name: 'player',
          name_localizations: {
            'pt-BR': 'jogador'
          },
          description: 'Enter the player',
          description_localizations: {
            'pt-BR': 'Insira o jogador'
          }
        }
      ],
      category: 'general',
      client
    })
  }

  async run (ctx: CommandContext) {
    const users = await User.find(
      {
        granex: {
          $gt: 0
        }
      }
    )

    const options = ctx.interaction.data.options as CommandOptions[]
    const _user = await this.client?.getRESTUser(options ? options[0].value! : ctx.interaction.member?.id!)
    
    users.sort((a, b) => b.granex - a.granex)
    var pos = users.findIndex(u => u.id === _user?.id) + 1

    const user = await User.findById(options ? options[0].value : ctx.interaction.member?.id)

    if (!user) return ctx.reply('helper.user_is_not_in_db')

    ctx.reply(user?.id == ctx.interaction.member?.id ? 'commands.granex.reply' : 'commands.granex.reply2', {
      user: _user?.mention,
      pos,
      granex: user.granex.toLocaleString()
    })
  }
}