import { User } from '../../../database'
import { Command, CommandContext } from '../structures'

interface CommandOptions {
  type: number
  name: string
  value: number
}

export default class ConvertCommand extends Command {
  constructor () {
    super({
      name: 'convert',
      name_localizations: {
        'pt-BR': 'converter'
      },
      description: 'Convert Refined Granex in Granex',
      description_localizations: {
        'pt-BR': 'Converte Granex Refinado em Granex'
      },
      options: [
        {
          type: 10,
          name: 'amount',
          name_localizations: {
            'pt-BR': 'quantidade'
          },
          description: 'Enter the amount of Refined Granex',
          description_localizations: {
            'pt-BR': 'Insira a quantidade de Granex Refinado'
          },
          required: true
        }
      ],
      category: 'general'
    })
  }

  async run (ctx: CommandContext) {
    const option = ctx.interaction.data.options![0] as CommandOptions
    const user = await User.findById(ctx.member.id)

    if (option.value > user!.refinedGranex) return ctx.reply('helper.dont_have_granex')

    user!.granex += option.value * 480
    user!.refinedGranex -= option.value
    user?.save()

    ctx.reply('commands.convert.done', {
      refinedGranex: option.value,
      granex: (option.value * 480).toLocaleString()
    })
  }
}