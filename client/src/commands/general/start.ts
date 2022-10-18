import { User } from '../../../../database'
import { Command, CommandContext } from '../../structures'

export default class StartCommand extends Command {
  constructor () {
    super({
      name: 'start',
      name_localizations: {
        'pt-BR': 'iniciar'
      },
      description: 'Create your data to start to play',
      description_localizations: {
        'pt-BR': 'Crie seus dados para começar a jogar'
      },
      category: 'general'
    })
  }

  async run (ctx: CommandContext) {
    const user = await User.findById(ctx.interaction.member?.id)
    if (user) return ctx.reply('commands.start.you_already_created_data')

    new User(
      {
        _id: ctx.interaction.member?.id
      }
    )
    .save()

    ctx.reply('commands.start.done')
  }
}