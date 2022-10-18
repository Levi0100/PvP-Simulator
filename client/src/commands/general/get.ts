import { Weapon } from '../../../../database'
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
            if (percentual <= 2) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 5
                }
              }
            )
            if (percentual <= 11) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 4
                }
              }
            )
            if (percentual <= 16) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 3
                }
              }
            )
            if (percentual <= 25) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 2
                }
              }
            )
            if (percentual <= 46) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 1
                }
              }
            )
            else weapons = await Weapon.find(
              {
                stars: {
                  $eq: 1
                }
              }
            )


            var weapon = weapons[Math.floor(Math.random() * weapons.length)]
            const locale = await import(`../../../../locales/${ctx.db.guild.locale}/weapons`)
            return console.log(weapons)

            var _weapon = locale.weapons[weapon.type!][weapon.name!]

            ctx.reply('commands.get.congrats', {
              weapon: `${_weapon.name} ${_weapon.type}`
            })
          }
        }
      }
      break
      case 'refined': {
        
      }
    }
  }
}