import { User } from '../../../../database'
import { Command, CommandContext, Embed } from '../../structures'
import { createCanvas, loadImage } from 'canvas'

interface CommandOptions {
  value: string
  type: number
  name: string
}

export default class InventoryCommand extends Command {
  constructor () {
    super({
      name: 'inventory',
      name_localizations: {
        'pt-BR': 'inventário'
      },
      description: 'Shows your inventory',
      description_localizations: {
        'pt-BR': 'Mostra seu inventário'
      },
      options: [
        {
          type: 3,
          name: 'filter',
          name_localizations: {
            'pt-BR': 'filtro'
          },
          description: 'Filter your inventory according to the choiced option',
          description_localizations: {
            'pt-BR': 'Filtra seu inventário de acordo com a opção escolhida'
          },
          choices: [
            {
              name: 'Helmet',
              name_localizations: {
                'pt-BR': 'Capacete'
              },
              value: 'helmet'
            },
            {
              name: 'Chest',
              name_localizations: {
                'pt-BR': 'Peitoral'
              },
              value: 'chest'
            },
            {
              name: 'Pants',
              name_localizations: {
                'pt-BR': 'Calças'
              },
              value: 'pants'
            },
            {
              name: 'Boots',
              name_localizations: {
                'pt-BR': 'Botas'
              },
              value: 'boots'
            },
            {
              name: 'Spear',
              name_localizations: {
                'pt-BR': 'Lança'
              },
              value: 'spear'
            },
            {
              name: 'Broad Sword',
              name_localizations: {
                'pt-BR': 'Espadão'
              },
              value: 'broad_sword'
            },
            {
              name: 'Sword',
              name_localizations: {
                'pt-BR': 'Espada'
              },
              value: 'sword'
            }
          ]
        }
      ],
      category: 'general'
    })
  }

  async run (ctx: CommandContext) {
    const user = await User.findById(ctx.interaction.member?.id)
    const options = ctx.interaction.data.options as CommandOptions[]
    const embed = new Embed()
    const { armors } = await import(`../../../../locales/${ctx.db.user.locale}/armors`)
    const { weapons } = await import(`../../../../locales/${ctx.db.user.locale}/weapons`)

    if (options) {
      switch (options[0].value) {
        case 'helmet': {
          if (user?.inventory?.armors.filter(armor => armor.type == options[0].value).length === 0) return ctx.reply('commands.inventory.empty')
          
          var pos = 0
  
          embed.setTitle(await this.locale.get('commands.inventory.embed.title'))
          embed.setFooter(await this.locale.get('commands.inventory.embed.footer', {
            filter: options[0].value
          }))
  
          for (const armor of user!.inventory!.armors.filter(armor => armor.type == 'helmet')) {
            var _armor = armors[armor.type][armor.name]
            embed.addField(`${_armor.name} ${_armor.type}`, await this.locale.get('commands.inventory.embed.field', {
              pos: pos++,
              def: armor.def,
              stars: armor.stars
            }))
          }
  
          ctx.reply(embed.build())
        }
        break
        case 'chest': {
          if (user?.inventory?.armors.filter(armor => armor.type == options[0].value).length === 0) return ctx.reply('commands.inventory.empty')
  
          var pos = 0
  
          embed.setTitle(await this.locale.get('commands.inventory.embed.title'))
          embed.setFooter(await this.locale.get('commands.inventory.embed.footer', {
            filter: options[0].value
          }))
  
          for (const armor of user!.inventory!.armors.filter(armor => armor.type == 'chest')) {
            var _armor = armors[armor.type][armor.name]
            embed.addField(`${_armor.name} ${_armor.type}`, await this.locale.get('commands.inventory.embed.field', {
              pos: pos++,
              def: armor.def,
              stars: armor.stars
            }))
          }
  
          ctx.reply(embed.build())
        }
        break
        case 'pants': {
          if (user?.inventory?.armors.filter(armor => armor.type == options[0].value).length === 0) return ctx.reply('commands.inventory.empty')
  
          var pos = 0
  
          embed.setTitle(await this.locale.get('commands.inventory.embed.title'))
          embed.setFooter(await this.locale.get('commands.inventory.embed.footer', {
            filter: options[0].value
          }))
  
          for (const armor of user!.inventory!.armors.filter(armor => armor.type == 'pants')) {
            var _armor = armors[armor.type][armor.name]
            embed.addField(`${_armor.name} ${_armor.type}`, await this.locale.get('commands.inventory.embed.field', {
              pos: pos++,
              def: armor.def,
              stars: armor.stars
            }))
          }
  
          ctx.reply(embed.build())
        }
        break
        case 'boots': {
          if (user?.inventory?.armors.filter(armor => armor.type == options[0].value).length === 0) return ctx.reply('commands.inventory.empty')
  
          var pos = 0
  
          embed.setTitle(await this.locale.get('commands.inventory.embed.title'))
          embed.setFooter(await this.locale.get('commands.inventory.embed.footer', {
            filter: options[0].value
          }))
  
          for (const armor of user!.inventory!.armors.filter(armor => armor.type == 'boots')) {
            var _armor = armors[armor.type][armor.name]
            embed.addField(`${_armor.name} ${_armor.type}`, await this.locale.get('commands.inventory.embed.field', {
              pos: pos++,
              def: armor.def,
              stars: armor.stars
            }))
          }
  
          ctx.reply(embed.build())
        }
        break
        case 'broad_sword': {
          if (user?.inventory?.weapons.filter(weapon => weapon.type == options[0].value).length === 0) return ctx.reply('commands.inventory.empty')
  
          var pos = 0
  
          embed.setTitle(await this.locale.get('commands.inventory.embed.title'))
          embed.setFooter(await this.locale.get('commands.inventory.embed.footer', {
            filter: options[0].value
          }))
  
          for (const weapon of user!.inventory!.weapons.filter(weapon => weapon.type == 'broad_sword')) {
            var _weapon = weapons[weapon.type][weapon.name]
            embed.addField(`${_weapon.name} ${_weapon.type}`, await this.locale.get('commands.inventory.embed.field2', {
              pos: pos++,
              damage: weapon.damage,
              stars: weapon.stars
            }))
          }
  
          ctx.reply(embed.build())
        }
        break
        case 'sword': {
          if (user?.inventory?.weapons.filter(weapon => weapon.type == options[0].value).length === 0) return ctx.reply('commands.inventory.empty')
  
          var pos = 0
  
          embed.setTitle(await this.locale.get('commands.inventory.embed.title'))
          embed.setFooter(await this.locale.get('commands.inventory.embed.footer', {
            filter: options[0].value
          }))
  
          for (const weapon of user!.inventory!.weapons.filter(weapon => weapon.type == 'sword')) {
            var _weapon = weapons[weapon.type][weapon.name]
            embed.addField(`${_weapon.name} ${_weapon.type}`, await this.locale.get('commands.inventory.embed.field2', {
              pos: pos++,
              damage: weapon.damage,
              stars: weapon.stars
            }))
          }
  
          ctx.reply(embed.build())
        }
      }
    }
    else {
      const canvas = createCanvas(1100, 1100)
      const _canvas = createCanvas(1100, 1100)
      const context = canvas.getContext('2d')
      const _context = _canvas.getContext('2d')

      const bg = await loadImage('https://imgur.com/Xnbhouw.png')
      const template = await loadImage('https://imgur.com/1BSUWdY.png')
      const avatar = await loadImage(ctx.interaction.member!.avatarURL)
      
      _context.beginPath()
      _context.arc(550, 578, 184, 0, Math.PI * 2, true)
      _context.closePath()
      _context.clip()
      _context.stroke()
      _context.drawImage(avatar, 366, 394, 368, 368)

      var avatarImg = _canvas
      context.drawImage(bg, 0, 0, canvas.width, canvas.height)
      context.drawImage(avatarImg, 0, 0, canvas.width, canvas.height)
      context.drawImage(template, 0, 0, canvas.width, canvas.height)

      ctx.reply('', {
        file: canvas.toBuffer(),
        name: 'inventory.png'
      })
    }
  }
}