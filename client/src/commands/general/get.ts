import { Command, CommandContext } from '../../structures'

export default class GetCommand extends Command {
  constructor () {
    super({
      name: 'get',
      name_localizations: {
        'pt-BR': 'obter'
      },
      description: 'Get a random weapon or a random armor',
      description_localizations: {
        'pt-BR': 'Pegue uma arma aleatória ou uma armadura aleatória'
      },
      options: [
        {
          type: 1,
          name: 'normal',
          description: 'Get a random weapon or a random armor',
          description_localizations: {
            'pt-BR': 'Pegue uma arma aleatória ou uma armadura aleatória'
          }
        },
        {
          type: 1,
          name: 'refined',
          name_localizations: {
            'pt-BR': 'refinado'
          },
          description: 'Increases the chances of winning a better weapon or armor',
          description_localizations: {
            'pt-BR': 'Aumenta as chances de conseguir uma arma ou armadura melhor'
          }
        }
      ],
      category: 'general'
    })
  }

  async run (ctx: CommandContext) {
    const option = ctx.interaction.data.options![0]

    var weapons
    var armors
    var array = [
      //'armor',
      'weapon'
    ]
    var weaponOrArmor = array[Math.floor(Math.random() * array.length)]
    
    switch (option.name) {
      case 'normal': {
        var percentual = Math.floor(Math.random() * 100) + 1

        switch (weaponOrArmor) {
          case 'armor': {

          }
          break
          default: {
            /*if (percentual <= 46) return ctx.reply('Arma 1 estrela')
            if (percentual <= 25) return ctx.reply('Arma 2 estrelas')
            if (percentual <= 16) return ctx.reply('Arma 3 estrelas')
            if (percentual <= 11) return ctx.reply('Arma 4 estrelas')
            if (percentual <= 2) return ctx.reply('Arma 5 estrelas')*/
            
            if (percentual <= 1) return ctx.reply('Arma 5 estrelas')
            if (percentual <= 11) return ctx.reply('Arma 4 estrelas')
            if (percentual <= 35) return ctx.reply('Arma 3 estrelas')
            if (percentual <= 62) return ctx.reply('Arma 2 estrelas')
            if (percentual <= 90) return ctx.reply('Arma 1 estrela')
            
            else return ctx.reply('Erro na porcentagem')
          }
        }
      }
      break
      case 'refined': {
        
      }
    }
  }
}