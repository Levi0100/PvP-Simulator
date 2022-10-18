import { Guild } from '../../../../database'
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
      permissions: ['manageGuild'],
      options: [
        {
          type: 1,
          name: 'language',
          name_localizations: {
            'pt-BR': 'idioma'
          },
          description: 'Change the language that I interact on this server',
          description_localizations: {
            'pt-BR': 'Altere o idioma que eu interajo no servidor'
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
    const guild = await Guild.findById(ctx.guild.id) || new Guild({
      _id: ctx.guild.id
    })
    const option = ctx.interaction.data.options?.find(index => index) as CommandOptions
    const { options } = ctx.interaction.data.options?.find(index => index) as CommandOptions
    
    switch (option.name) {
      case 'language': {
        guild.locale = options[0].value
        guild.save()

        switch (options[0].value) {
          case 'pt': ctx.reply('Agora eu irei falar em português neste servidor. Aqui é o Brasil!')
          break
          case 'en': ctx.reply('Now I will speak in english on this server. This is America!')
        }
      }
    }
  }
}