import { User } from '../../../../database'
import { Command, CommandContext } from '../../structures'

interface SubCommandOptions {
  value: number
  type: number
  name: string
}

interface CommandOptions {
  name: string
  type: number
  options: SubCommandOptions[]
}

export default class EquipCommand extends Command {
  constructor () {
    super({
      name: 'equip',
      name_localizations: {
        'pt-BR': 'equipar'
      },
      description: 'Equip a weapon or armor',
      description_localizations: {
        'pt-BR': 'Equipe uma arma ou armadura'
      },
      options: [
        {
          type: 1,
          name: 'helmet',
          name_localizations: {
            'pt-BR': 'capacete'
          },
          description: 'Equip a helmet',
          description_localizations: {
            'pt-BR': 'Equipe um capatece'
          },
          options: [
            {
              type: 10,
              name: 'helmet_position',
              name_localizations: {
                'pt-BR': 'posição_do_capacete'
              },
              description: 'Enter the helmet position',
              description_localizations: {
                'pt-BR': 'Insira a posição do capacete'
              },
              required: true
            }
          ]
        },
        {
          type: 1,
          name: 'chest',
          name_localizations: {
            'pt-BR': 'peitoral'
          },
          description: 'Equip a chest',
          description_localizations: {
            'pt-BR': 'Equipe um peitoral'
          },
          options: [
            {
              type: 10,
              name: 'chest_position',
              name_localizations: {
                'pt-BR': 'posição_do_peitoral'
              },
              description: 'Enter the chest position',
              description_localizations: {
                'pt-BR': 'Insira a posição do peitoral'
              },
              required: true
            }
          ]
        },
        {
          type: 1,
          name: 'pants',
          name_localizations: {
            'pt-BR': 'calças'
          },
          description: 'Equip a pant',
          description_localizations: {
            'pt-BR': 'Equipe uma calça'
          },
          options: [
            {
              type: 10,
              name: 'pant_position',
              name_localizations: {
                'pt-BR': 'posição_da_calça'
              },
              description: 'Enter the pant position',
              description_localizations: {
                'pt-BR': 'Insira a posição da calça'
              },
              required: true
            }
          ]
        },        
        {
          type: 1,
          name: 'boots',
          name_localizations: {
            'pt-BR': 'botas'
          },
          description: 'Equip a boots',
          description_localizations: {
            'pt-BR': 'Equipe uma bota'
          },
          options: [
            {
              type: 10,
              name: 'boot_position',
              name_localizations: {
                'pt-BR': 'posição_da_bota'
              },
              description: 'Enter the boot position',
              description_localizations: {
                'pt-BR': 'Insira a posição da bota'
              },
              required: true
            }
          ]
        },
        {
          type: 1,
          name: 'spear',
          name_localizations: {
            'pt-BR': 'lança'
          },
          description: 'Equip a spear',
          description_localizations: {
            'pt-BR': 'Equipe uma lança'
          },
          options: [
            {
              type: 10,
              name: 'spear_position',
              name_localizations: {
                'pt-BR': 'posição_da_lança'
              },
              description: 'Enter the spear position',
              description_localizations: {
                'pt-BR': 'Insira a posição da lança'
              },
              required: true
            }
          ]
        },
        {
          type: 1,
          name: 'broad_sword',
          name_localizations: {
            'pt-BR': 'espadão'
          },
          description: 'Equip a broad sword',
          description_localizations: {
            'pt-BR': 'Equipe um espadão'
          },
          options: [
            {
              type: 10,
              name: 'broad_sword_position',
              name_localizations: {
                'pt-BR': 'posição_do_espadão'
              },
              description: 'Enter the broad sword position',
              description_localizations: {
                'pt-BR': 'Insira a posição do espadão'
              },
              required: true
            }
          ]
        },
        {
          type: 1,
          name: 'sword',
          name_localizations: {
            'pt-BR': 'espada'
          },
          description: 'Equip a sword',
          description_localizations: {
            'pt-BR': 'Equipe um espada'
          },
          options: [
            {
              type: 10,
              name: 'sword_position',
              name_localizations: {
                'pt-BR': 'posição_do_espada'
              },
              description: 'Enter the sword position',
              description_localizations: {
                'pt-BR': 'Insira a posição do espada'
              },
              required: true
            }
          ]
        }
      ],
      category: 'general'
    })
  }

  async run (ctx: CommandContext) {
    const { armors } = await import(`../../../../locales/${ctx.db.user.locale}/armors`)
    const { weapons } = await import(`../../../../locales/${ctx.db.user.locale}/weapons`)
    const user: any = await User.findById(ctx.interaction.member?.id)
    const option = ctx.interaction.data.options![0] as CommandOptions

    switch (option.name) {
      case 'helmet': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === 'helmet')[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        if (user.inUse.helmet) user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1, user.inUse.helmet)
        else user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)

        user.inUse.helmet = armor

        var helmet = armors[armor.type][armor.name]

        user.save()

        ctx.reply('commands.equip.equiped', {
          item: `${helmet.name} ${helmet.type}`
        })
      }
      break
      case 'chest': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === 'chest')[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        if (user.inUse.chest) user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1, user.inUse.chest)
        else user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)

        user.inUse.chest = armor

        var chest = armors[armor.type][armor.name]

        user.save()

        ctx.reply('commands.equip.equiped', {
          item: `${chest.name} ${chest.type}`
        })
      }
      break
      case 'pants': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === 'pants')[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        if (user.inUse.pants) user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1, user.inUse.pants)
        else user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)

        user.inUse.pants = armor

        var pants = armors[armor.type][armor.name]

        user.save()

        ctx.reply('commands.equip.equiped', {
          item: `${pants.name} ${pants.type}`
        })
      }
      break
      case 'boots': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === 'boots')[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        if (user.inUse.boots) user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1, user.inUse.boots)
        else user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)

        user.inUse.boots = armor

        var boots = armors[armor.type][armor.name]

        user.save()

        ctx.reply('commands.equip.equiped', {
          item: `${boots.name} ${boots.type}`
        })
      }
      break
      case 'broad_sword': {
        var weapon = user.inventory.weapons.filter((weapon: any) => weapon.type === 'broad_sword')[option.options[0].value]
        if (!weapon) return ctx.reply('commands.equip.dont_have_this')

        if (user.inUse.weapon) user.inventory.weapons.splice(user.inventory.weapons.indexOf(weapon), 1, user.inUse.weapon)
        else user.inventory.weapons.splice(user.inventory.weapons.indexOf(weapon), 1)

        user.inUse.weapon = weapon

        var broad_sword = weapons[weapon.type][weapon.name]

        user.save()

        ctx.reply('commands.equip.equiped', {
          item: `${broad_sword.name} ${broad_sword.type}`
        })
      }
    }
  }
}