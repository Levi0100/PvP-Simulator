import { User } from '../../../database'
import { Command, CommandContext } from '../structures'

interface SubCommandOptions {
  value: number
  type: number
  name: string
}

interface CommandOptions {
  name: string
  type: number
  options: SubCommandOptions[]
  value: number
}

export default class RemoveCommand extends Command {
  constructor () {
    super({
      name: 'remove',
      name_localizations: {
        'pt-BR': 'remover'
      },
      description: 'Remove a item from your inventory',
      description_localizations: {
        'pt-BR': 'Remove um item do seu inventário'
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
    const user: any = await User.findById(ctx.member.id)
    const option = ctx.interaction.data.options![0] as CommandOptions

    switch (option.name) {
      case 'helmet': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === option.name)[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)
        user.save()

        var item = armors[armor.type][armor.name]

        ctx.reply('commands.remove.done', {
          item: `${item.name} ${item.type}`
        })
      }
      break
      case 'chest': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === option.name)[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)
        user.save()

        var item = armors[armor.type][armor.name]

        ctx.reply('commands.remove.done', {
          item: `${item.name} ${item.type}`
        })
      }
      break
      case 'pants': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === option.name)[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)
        user.save()

        var item = armors[armor.type][armor.name]

        ctx.reply('commands.remove.done', {
          item: `${item.name} ${item.type}`
        })
      }
      break
      case 'boots': {
        var armor = user.inventory.armors.filter((armor: any) => armor.type === option.name)[option.options[0].value]
        if (!armor) return ctx.reply('commands.equip.dont_have_this')

        user.inventory.armors.splice(user.inventory.armors.indexOf(armor), 1)
        user.save()

        var item = armors[armor.type][armor.name]

        ctx.reply('commands.remove.done', {
          item: `${item.name} ${item.type}`
        })
      }
      break
      case 'sword': {
        var weapon = user.inventory.weapons.filter((weapon: any) => weapon.type === option.name)[option.options[0].value]
        if (!weapon) return ctx.reply('commands.equip.dont_have_this')

        user.inventory.weapons.splice(user.inventory.weapons.indexOf(weapon), 1)
        user.save()

        var item = weapons[weapon.type][weapon.name]

        ctx.reply('commands.remove.done', {
          item: `${item.name} ${item.type}`
        })
      }
      break
      case 'broad_sword': {
        var weapon = user.inventory.weapons.filter((weapon: any) => weapon.type === option.name)[option.options[0].value]
        if (!weapon) return ctx.reply('commands.equip.dont_have_this')

        user.inventory.weapons.splice(user.inventory.weapons.indexOf(weapon), 1)
        user.save()

        var item = weapons[weapon.type][weapon.name]

        ctx.reply('commands.remove.done', {
          item: `${item.name} ${item.type}`
        })
      }
    }
  }
}