import { User } from '../../../../database'
import { App, armors, Command, CommandContext, Embed, weapons } from '../../structures'

export default class ClaimCommand extends Command {
  constructor (client: App) {
    super({
      name: 'claim',
      name_localizations: {
        'pt-BR': 'obter'
      },
      description: 'Claim a random weapon or a random armor',
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
      category: 'general',
      botPermissions: ['embedLinks'],
      client
    })
  }

  async run (ctx: CommandContext) {
    const user = await User.findById(ctx.interaction.member?.id)
    const option = ctx.interaction.data.options![0]

    var array = [
      'armor',
      'weapon'
    ]
    var weaponOrArmor = array[Math.floor(Math.random() * array.length)]
    
    switch (option.name) {
      case 'normal': {
        if (ctx.db.user.getTime > Date.now()) return ctx.reply('commands.get.has_been_picked', {
          time: `<t:${parseInt(((ctx.db.user.getTime) / 1000).toString())}:R>`
        })
        
        var percentual = Math.random() * 100

        switch (weaponOrArmor) {
          case 'armor': {
            if (user?.inventory?.armors.length! >= 25) return ctx.reply('helper.limit_of_armors')
            var amr

            if (percentual <= 0.05) amr = armors.filter(armor => armor.stars === 5)
            else if (percentual <= 1.05) amr =  armors.filter(armor => armor.stars === 4)
            else if (percentual <= 7) amr =  armors.filter(armor => armor.stars === 3)
            else if (percentual <= 39.95) amr =  armors.filter(armor => armor.stars === 2)
            else if (percentual <= 51.95) amr =  armors.filter(armor => armor.stars === 1)
            else amr =  armors.filter(armor => armor.stars === 1)

            var armor = amr[Math.floor(Math.random() * amr.length)]
            const locale = await import(`../../../../locales/${ctx.db.user.locale}/armors`)

            var _armor = locale.armors[armor.type!][armor.name!]

            user?.inventory?.armors.push(
              {
                name: armor.name,
                type: armor.type,
                stars: armor.stars,
                def: armor.def
              }
            )
            user!.getTime = Date.now() + 300000
            user?.save()

            const embed = new Embed()
            .setAuthor(`${_armor.name} ${_armor.type}`, this.client?.user.avatarURL)
            .setTitle(await this.locale.get('commands.get.status'))
            .addFields([
              {
                name: await this.locale.get('commands.get.def'),
                value: armor.def,
                inline: true
              },
              {
                name: await this.locale.get('commands.get.stars'),
                value: armor.stars,
                inline: true
              }
            ])

            ctx.reply(embed.build(await this.locale.get('commands.get.congrats2', {
              armor: `${_armor.name} ${_armor.type}`
            })))
          }
          break
          default: {
            if (user?.inventory?.weapons.length! >= 25) return ctx.reply('helper.limit_of_weapons')
            var wps

            if (percentual <= 0.05) wps =  weapons.filter(weapon => weapon.stars === 5)
            else if (percentual <= 1.05) wps = weapons.filter(weapon => weapon.stars === 4)
            else if (percentual <= 7) wps =  weapons.filter(weapon => weapon.stars === 3)
            else if (percentual <= 39.95) wps =  weapons.filter(weapon => weapon.stars === 2)
            else if (percentual <= 51.95) wps =  weapons.filter(weapon => weapon.stars === 1)
            else wps =  weapons.filter(weapon => weapon.stars === 1)

            var weapon = wps[Math.floor(Math.random() * wps.length)]
            const locale = await import(`../../../../locales/${ctx.db.user.locale}/weapons`)

            var _weapon = locale.weapons[weapon.type!][weapon.name!]

            user?.inventory?.weapons.push(
              {
                name: weapon.name,
                type: weapon.type,
                stars: weapon.stars,
                damage: weapon.damage
              }
            )
            user!.getTime = Date.now() + 300000
            user?.save()

            const embed = new Embed()
            .setAuthor(`${_weapon.name} ${_weapon.type}`, this.client?.user.avatarURL)
            .setTitle(await this.locale.get('commands.get.status'))
            .addFields([
              {
                name: await this.locale.get('commands.get.damage'),
                value: weapon.damage,
                inline: true
              },
              {
                name: await this.locale.get('commands.get.stars'),
                value: weapon.stars,
                inline: true
              }
            ])

            ctx.reply(embed.build(await this.locale.get('commands.get.congrats', {
              weapon: `${_weapon.name} ${_weapon.type}`
            })))
          }
        }
      }
      break
      case 'refined': {
        if (!user?.refinedGranex) return ctx.reply('commands.get.you_dont_have_refined_granex')
        var percentual = Math.random() * 100

        user.refinedGranex -= 1

        switch (weaponOrArmor) {
          case 'armor': {
            if (user?.inventory?.armors.length! >= 25) return ctx.reply('helper.limit_of_armors')
            var amr

            if (percentual <= 2) amr = armors.filter(armor => armor.stars === 5)
            else if (percentual <= 14) amr = armors.filter(armor => armor.stars === 4)
            else if (percentual <= 19) amr = armors.filter(armor => armor.stars === 3)
            else if (percentual <= 25) amr = armors.filter(armor => armor.stars === 2)
            else if (percentual <= 40) amr = armors.filter(armor => armor.stars === 1)
            else amr = armors.filter(armor => armor.stars === 1)

            var armor = amr[Math.floor(Math.random() * amr.length)]
            const locale = await import(`../../../../locales/${ctx.db.user.locale}/armors`)

            var _armor = locale.armors[armor.type!][armor.name!]

            user?.inventory?.armors.push(
              {
                name: armor.name,
                type: armor.type,
                stars: armor.stars,
                def: armor.def
              }
            )
            user?.save()

            const embed = new Embed()
            .setAuthor(`${_armor.name} ${_armor.type}`, this.client?.user.avatarURL)
            .setTitle(await this.locale.get('commands.get.status'))
            .addFields([
              {
                name: await this.locale.get('commands.get.def'),
                value: armor.def,
                inline: true
              },
              {
                name: await this.locale.get('commands.get.stars'),
                value: armor.stars,
                inline: true
              }
            ])

            ctx.reply(embed.build(await this.locale.get('commands.get.congrats2', {
              armor: `${_armor.name} ${_armor.type}`
            })))
          }
          break
          default: {
            if (user?.inventory?.weapons.length! >= 25) return ctx.reply('helper.limit_of_weapons')
            var wps

            if (percentual <= 2) wps =  weapons.filter(weapon => weapon.stars === 5)
            else if (percentual <= 14) wps =  weapons.filter(weapon => weapon.stars === 4)
            else if (percentual <= 19) wps =  weapons.filter(weapon => weapon.stars === 3)
            else if (percentual <= 25) wps =  weapons.filter(weapon => weapon.stars === 2)
            else if (percentual <= 40) wps =  weapons.filter(weapon => weapon.stars === 1)
            else wps =  weapons.filter(weapon => weapon.stars === 1)

            var weapon = wps[Math.floor(Math.random() * wps.length)]
            const locale = await import(`../../../../locales/${ctx.db.user.locale}/weapons`)

            var _weapon = locale.weapons[weapon.type!][weapon.name!]

            user?.inventory?.weapons.push(
              {
                name: weapon.name,
                type: weapon.type,
                stars: weapon.stars,
                damage: weapon.damage
              }
            )
            user?.save()

            const embed = new Embed()
            .setAuthor(`${_weapon.name} ${_weapon.type}`, this.client?.user.avatarURL)
            .setTitle(await this.locale.get('commands.get.status'))
            .addFields([
              {
                name: await this.locale.get('commands.get.damage'),
                value: weapon.damage,
                inline: true
              },
              {
                name: await this.locale.get('commands.get.stars'),
                value: weapon.stars,
                inline: true
              }
            ])

            ctx.reply(embed.build(await this.locale.get('commands.get.congrats', {
              weapon: `${_weapon.name} ${_weapon.type}`
            })))
          }
        }
      }
    }
  }
}