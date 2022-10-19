import { Weapon, Armor } from '../../../../database'
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

    var array = [
      'armor',
      'weapon'
    ]
    var weaponOrArmor = array[Math.floor(Math.random() * array.length)]
    
    switch (option.name) {
      case 'normal': {
        var percentual = Math.random() * 100

        switch (weaponOrArmor) {
          case 'armor': {
            var armors

            if (percentual <= 0.05) armors = await Armor.find(
              {
                stars: {
                  $eq: 5
                }
              }
            )
            else if (percentual <= 1.05) armors = await Armor.find(
              {
                stars: {
                  $eq: 4
                }
              }
            )
            else if (percentual <= 7) armors = await Armor.find(
              {
                stars: {
                  $eq: 3
                }
              }
            )
            else if (percentual <= 39.95) armors = await Armor.find(
              {
                stars: {
                  $eq: 2
                }
              }
            )
            else if (percentual <= 51.95) armors = await Armor.find(
              {
                stars: {
                  $eq: 1
                }
              }
            )
            else armors = await Armor.find(
              {
                stars: {
                  $eq: 1
                }
              }
            )

            var armor = armors[Math.floor(Math.random() * armors.length)]
            const locale = await import(`../../../../locales/${ctx.db.guild.locale}/armors`)

            var _armor = locale.armors[armor.type!][armor.name!]

            ctx.reply('commands.get.congrats2', {
              armor: `${_armor.name} ${_armor.type}`
            })
          }
          break
          default: {
            var weapons

            if (percentual <= 0.05) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 5
                }
              }
            )
            else if (percentual <= 1.05) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 4
                }
              }
            )
            else if (percentual <= 7) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 3
                }
              }
            )
            else if (percentual <= 39.95) weapons = await Weapon.find(
              {
                stars: {
                  $eq: 2
                }
              }
            )
            else if (percentual <= 51.95) weapons = await Weapon.find(
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