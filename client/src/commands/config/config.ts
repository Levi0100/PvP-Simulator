import { User } from '../../../../database'
import { Command, CommandContext } from '../../structures'

interface CommandOptions {
  name: string
  value: string
  type: number
  options: any[]
}

export default class ConfigCommand extends Command {
  constructor () {
    super({
      name: 'config',
      description: 'Configure me for I work right',
      description_localizations: {
        'pt-BR': 'Me configure para que eu funcione direito'
      },
      options: [
        {
          type: 1,
          name: 'language',
          name_localizations: {
            'pt-BR': 'idioma'
          },
          description: 'Change the language that I interact with you',
          description_localizations: {
            'pt-BR': 'Altere o idioma que eu interajo com você'
          },
          options: [
            {
              type: 3,
              name: 'choose',
              name_localizations: {
                'pt-BR': 'escolha'
              },
              description: 'Choose the language',
              description_localizations: {
                'pt-BR': 'Escolha o idioma'
              },
              choices: [
                {
                  name: 'Português Brasileiro',
                  value: 'pt'
                },
                {
                  name: 'American English',
                  value: 'en'
                }
              ],
              required: true
            }
          ]
        }
      ],
      category: 'config'
    })
  }

  async run (ctx: CommandContext) {
    const user = await User.findById(ctx.interaction.member?.id) || new User({
      _id: ctx.interaction.member?.id
    })
    const option = ctx.interaction.data.options?.find(index => index) as CommandOptions
    const { options } = ctx.interaction.data.options?.find(index => index) as CommandOptions
    
    switch (option.name) {
      case 'language': {
        user.locale = options[0].value
        user.save()

        switch (options[0].value) {
          case 'pt': ctx.reply('Agora eu irei falar em português com você. Aqui é o Brasil!')
          break
          case 'en': ctx.reply('Now I will speak in english with you. This is America!')
        }
      }
    }
  }
}