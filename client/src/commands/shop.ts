import { ComponentInteraction } from 'eris'
import { User } from '../../../database'
import { ActionRow, App, armors, Button, Command, CommandContext, Embed, weapons } from '../structures'

interface CommandOptions {
  name: string
  type: number
  value: any
}

export default class ShopCommand extends Command {
  constructor (client: App) {
    super({
      name: 'shop',
      name_localizations: {
        'pt-BR': 'loja'
      },
      description: 'Shows the available items from shop',
      description_localizations: {
        'pt-BR': 'Mostra os itens disponíveis da loja'
      },
      options: [
        {
          type: 3,
          name: 'filter',
          name_localizations: {
            'pt-BR': 'filtro'
          },
          description: 'Choose a item',
          description_localizations: {
            'pt-BR': 'Escolha um item'
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
            },
            {
              name: 'Fill energy (200 granex)',
              name_localizations: {
                'pt-BR': 'Encher energia (200 granex)'
              },
              value: 'fill_energy'
            }
          ],
          required: true
        },
        {
          type: 10,
          name: 'page',
          name_localizations: {
            'pt-BR': 'página'
          },
          description: 'Enter the page',
          description_localizations: {
            'pt-BR': 'Insira a página'
          }
        }
      ],
      category: 'general',
      client
    })
  }

  async run (ctx: CommandContext) {
    const options = ctx.interaction.data.options as CommandOptions[]
    const embed = new Embed()
    .setAuthor(await this.locale.get('commands.shop.embed.author', {
      page: options[1]?.value ?? 1
    }), this.client?.user.avatarURL)
    .setTitle(await this.locale.get('commands.shop.embed.title'))
    const row = new ActionRow()
    const row2 = new ActionRow()

    switch (options[0].value) {
      case 'helmet': {
        const locale = await import(`../../../../locales/${ctx.db.user.locale}/armors`)
        var ams = armors.filter(w => w.type === 'helmet' && w.rarity < 4).slice(options[1]?.value ?? 1 * 10 - 10, options[1]?.value ?? 1 * 10).sort((a, b) => b.price! - a.price!)

        var customId = 0
        for (var armor of ams) {
          var amr = locale.armors[armor.type][armor.name]
          embed.addField(`${amr?.name} ${amr?.type} (${armor.price?.toLocaleString()} Granex)`, await this.locale.get('commands.shop.embed.field', {
            rarity: armor.rarity,
            def: armor.def
          }), true)

          const button = new Button()
          .setStyle('SUCCESS')
          .setLabel(`${amr?.name} ${amr?.type}`)
          .setCustomId(`${customId++}`)

          if (customId <= 5) row.addComponent(button)
          else row2.addComponent(button)
        }

        const msg: any = await ctx.reply({
          embed,
          components: row2.components[0] ? [row, row2] : [row]
        })

        const collector = async (i: ComponentInteraction) => {
          if (i.message?.id !== msg.id) return
          if (i.channel.id !== ctx.interaction.channel.id) return

          const user = await User.findById(i.member?.id)

          await i.defer(64)
          if (user?.inventory?.armors.length! >= 25) return i.createMessage(await this.locale.get('helper.limit_of_armors'))

          switch (i.data.custom_id) {
            case '0': {
              if (user!.granex < ams[0].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[0])
              user?.save()

              var wp = locale.armors[ams[0].type][ams[0].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '1': {
              if (user!.granex < ams[1].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[1])
              user?.save()

              var wp = locale.armors[ams[1].type][ams[1].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '2': {
              if (user!.granex < ams[2].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[2].price!
              user?.inventory?.armors.push(ams[2])
              user?.save()

              var wp = locale.armors[ams[2].type][ams[2].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '3': {
              if (user!.granex < ams[3].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[3].price!
              user?.inventory?.armors.push(ams[3])
              user?.save()

              var wp = locale.armors[ams[3].type][ams[3].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '4': {
              if (user!.granex < ams[4].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[4].price!
              user?.inventory?.armors.push(ams[4])
              user?.save()

              var wp = locale.armors[ams[4].type][ams[4].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '5': {
              if (user!.granex < ams[5].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[5].price!
              user?.inventory?.armors.push(ams[5])
              user?.save()

              var wp = locale.armors[ams[5].type][ams[5].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '6': {
              if (user!.granex < ams[6].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[6].price!
              user?.inventory?.armors.push(ams[6])
              user?.save()

              var wp = locale.armors[ams[6].type][ams[6].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '7': {
              if (user!.granex < ams[7].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[7].price!
              user?.inventory?.armors.push(ams[7])
              user?.save()

              var wp = locale.armors[ams[7].type][ams[7].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '8': {
              if (user!.granex < ams[8].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[8].price!
              user?.inventory?.armors.push(ams[8])
              user?.save()

              var wp = locale.armors[ams[8].type][ams[8].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '9': {
              if (user!.granex < ams[9].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[9].price!
              user?.inventory?.armors.push(ams[9])
              user?.save()

              var wp = locale.armors[ams[9].type][ams[9].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
          }
        }

        this.client?.on('interactionCreate', collector)
        setTimeout(() => this.client?.removeListener('interactionCreate', collector), 1000 * 240)
      }
      break
      case 'chest': {
        const locale = await import(`../../../../locales/${ctx.db.user.locale}/armors`)
        var ams = armors.filter(w => w.type === 'chest' && w.rarity < 4).slice(options[1]?.value ?? 1 * 10 - 10, options[1]?.value ?? 1 * 10).sort((a, b) => b.price! - a.price!)

        var customId = 0
        for (var armor of ams) {
          var amr = locale.armors[armor.type][armor.name]
          embed.addField(`${amr?.name} ${amr?.type} (${armor.price?.toLocaleString()} Granex)`, await this.locale.get('commands.shop.embed.field', {
            rarity: armor.rarity,
            def: armor.def
          }), true)

          const button = new Button()
          .setStyle('SUCCESS')
          .setLabel(`${amr?.name} ${amr?.type}`)
          .setCustomId(`${customId++}`)

          if (customId <= 5) row.addComponent(button)
          else row2.addComponent(button)
        }

        const msg: any = await ctx.reply({
          embed,
          components: row2.components[0] ? [row, row2] : [row]
        })

        const collector = async (i: ComponentInteraction) => {
          if (i.message?.id !== msg.id) return
          if (i.channel.id !== ctx.interaction.channel.id) return

          const user = await User.findById(i.member?.id)

          await i.defer(64)
          if (user?.inventory?.armors.length! >= 25) return i.createMessage(await this.locale.get('helper.limit_of_armors'))

          switch (i.data.custom_id) {
            case '0': {
              if (user!.granex < ams[0].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[0])
              user?.save()

              var wp = locale.armors[ams[0].type][ams[0].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '1': {
              if (user!.granex < ams[1].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[1])
              user?.save()

              var wp = locale.armors[ams[1].type][ams[1].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '2': {
              if (user!.granex < ams[2].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[2].price!
              user?.inventory?.armors.push(ams[2])
              user?.save()

              var wp = locale.armors[ams[2].type][ams[2].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '3': {
              if (user!.granex < ams[3].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[3].price!
              user?.inventory?.armors.push(ams[3])
              user?.save()

              var wp = locale.armors[ams[3].type][ams[3].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '4': {
              if (user!.granex < ams[4].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[4].price!
              user?.inventory?.armors.push(ams[4])
              user?.save()

              var wp = locale.armors[ams[4].type][ams[4].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '5': {
              if (user!.granex < ams[5].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[5].price!
              user?.inventory?.armors.push(ams[5])
              user?.save()

              var wp = locale.armors[ams[5].type][ams[5].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '6': {
              if (user!.granex < ams[6].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[6].price!
              user?.inventory?.armors.push(ams[6])
              user?.save()

              var wp = locale.armors[ams[6].type][ams[6].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '7': {
              if (user!.granex < ams[7].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[7].price!
              user?.inventory?.armors.push(ams[7])
              user?.save()

              var wp = locale.armors[ams[7].type][ams[7].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '8': {
              if (user!.granex < ams[8].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[8].price!
              user?.inventory?.armors.push(ams[8])
              user?.save()

              var wp = locale.armors[ams[8].type][ams[8].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '9': {
              if (user!.granex < ams[9].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[9].price!
              user?.inventory?.armors.push(ams[9])
              user?.save()

              var wp = locale.armors[ams[9].type][ams[9].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
          }
        }

        this.client?.on('interactionCreate', collector)
        setTimeout(() => this.client?.removeListener('interactionCreate', collector), 1000 * 240)
      }
      break
      case 'pants': {
        const locale = await import(`../../../../locales/${ctx.db.user.locale}/armors`)
        var ams = armors.filter(w => w.type === 'pants' && w.rarity < 4).slice(options[1]?.value ?? 1 * 10 - 10, options[1]?.value ?? 1 * 10).sort((a, b) => b.price! - a.price!)

        var customId = 0
        for (var armor of ams) {
          var amr = locale.armors[armor.type][armor.name]
          embed.addField(`${amr?.name} ${amr?.type} (${armor.price?.toLocaleString()} Granex)`, await this.locale.get('commands.shop.embed.field', {
            rarity: armor.rarity,
            def: armor.def
          }), true)

          const button = new Button()
          .setStyle('SUCCESS')
          .setLabel(`${amr?.name} ${amr?.type}`)
          .setCustomId(`${customId++}`)

          if (customId <= 5) row.addComponent(button)
          else row2.addComponent(button)
        }

        const msg: any = await ctx.reply({
          embed,
          components: row2.components[0] ? [row, row2] : [row]
        })

        const collector = async (i: ComponentInteraction) => {
          if (i.message?.id !== msg.id) return
          if (i.channel.id !== ctx.interaction.channel.id) return

          const user = await User.findById(i.member?.id)

          await i.defer(64)
          if (user?.inventory?.armors.length! >= 25) return i.createMessage(await this.locale.get('helper.limit_of_armors'))

          switch (i.data.custom_id) {
            case '0': {
              if (user!.granex < ams[0].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[0])
              user?.save()

              var wp = locale.armors[ams[0].type][ams[0].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '1': {
              if (user!.granex < ams[1].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[1])
              user?.save()

              var wp = locale.armors[ams[1].type][ams[1].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '2': {
              if (user!.granex < ams[2].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[2].price!
              user?.inventory?.armors.push(ams[2])
              user?.save()

              var wp = locale.armors[ams[2].type][ams[2].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '3': {
              if (user!.granex < ams[3].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[3].price!
              user?.inventory?.armors.push(ams[3])
              user?.save()

              var wp = locale.armors[ams[3].type][ams[3].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '4': {
              if (user!.granex < ams[4].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[4].price!
              user?.inventory?.armors.push(ams[4])
              user?.save()

              var wp = locale.armors[ams[4].type][ams[4].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '5': {
              if (user!.granex < ams[5].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[5].price!
              user?.inventory?.armors.push(ams[5])
              user?.save()

              var wp = locale.armors[ams[5].type][ams[5].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '6': {
              if (user!.granex < ams[6].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[6].price!
              user?.inventory?.armors.push(ams[6])
              user?.save()

              var wp = locale.armors[ams[6].type][ams[6].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '7': {
              if (user!.granex < ams[7].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[7].price!
              user?.inventory?.armors.push(ams[7])
              user?.save()

              var wp = locale.armors[ams[7].type][ams[7].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '8': {
              if (user!.granex < ams[8].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[8].price!
              user?.inventory?.armors.push(ams[8])
              user?.save()

              var wp = locale.armors[ams[8].type][ams[8].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '9': {
              if (user!.granex < ams[9].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[9].price!
              user?.inventory?.armors.push(ams[9])
              user?.save()

              var wp = locale.armors[ams[9].type][ams[9].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
          }
        }

        this.client?.on('interactionCreate', collector)
        setTimeout(() => this.client?.removeListener('interactionCreate', collector), 1000 * 240)
      }
      break
      case 'boots': {
        const locale = await import(`../../../../locales/${ctx.db.user.locale}/armors`)
        var ams = armors.filter(w => w.type === 'boots' && w.rarity < 4).slice(options[1]?.value ?? 1 * 10 - 10, options[1]?.value ?? 1 * 10).sort((a, b) => b.price! - a.price!)

        var customId = 0
        for (var armor of ams) {
          var amr = locale.armors[armor.type][armor.name]
          embed.addField(`${amr?.name} ${amr?.type} (${armor.price?.toLocaleString()} Granex)`, await this.locale.get('commands.shop.embed.field', {
            rarity: armor.rarity,
            def: armor.def
          }), true)

          const button = new Button()
          .setStyle('SUCCESS')
          .setLabel(`${amr?.name} ${amr?.type}`)
          .setCustomId(`${customId++}`)

          if (customId <= 5) row.addComponent(button)
          else row2.addComponent(button)
        }

        const msg: any = await ctx.reply({
          embed,
          components: row2.components[0] ? [row, row2] : [row]
        })

        const collector = async (i: ComponentInteraction) => {
          if (i.message?.id !== msg.id) return
          if (i.channel.id !== ctx.interaction.channel.id) return

          const user = await User.findById(i.member?.id)

          await i.defer(64)
          if (user?.inventory?.armors.length! >= 25) return i.createMessage(await this.locale.get('helper.limit_of_armors'))

          switch (i.data.custom_id) {
            case '0': {
              if (user!.granex < ams[0].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[0])
              user?.save()

              var wp = locale.armors[ams[0].type][ams[0].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '1': {
              if (user!.granex < ams[1].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[0].price!
              user?.inventory?.armors.push(ams[1])
              user?.save()

              var wp = locale.armors[ams[1].type][ams[1].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '2': {
              if (user!.granex < ams[2].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[2].price!
              user?.inventory?.armors.push(ams[2])
              user?.save()

              var wp = locale.armors[ams[2].type][ams[2].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '3': {
              if (user!.granex < ams[3].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[3].price!
              user?.inventory?.armors.push(ams[3])
              user?.save()

              var wp = locale.armors[ams[3].type][ams[3].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '4': {
              if (user!.granex < ams[4].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[4].price!
              user?.inventory?.armors.push(ams[4])
              user?.save()

              var wp = locale.armors[ams[4].type][ams[4].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '5': {
              if (user!.granex < ams[5].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[5].price!
              user?.inventory?.armors.push(ams[5])
              user?.save()

              var wp = locale.armors[ams[5].type][ams[5].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '6': {
              if (user!.granex < ams[6].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[6].price!
              user?.inventory?.armors.push(ams[6])
              user?.save()

              var wp = locale.armors[ams[6].type][ams[6].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '7': {
              if (user!.granex < ams[7].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[7].price!
              user?.inventory?.armors.push(ams[7])
              user?.save()

              var wp = locale.armors[ams[7].type][ams[7].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '8': {
              if (user!.granex < ams[8].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[8].price!
              user?.inventory?.armors.push(ams[8])
              user?.save()

              var wp = locale.armors[ams[8].type][ams[8].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '9': {
              if (user!.granex < ams[9].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= ams[9].price!
              user?.inventory?.armors.push(ams[9])
              user?.save()

              var wp = locale.armors[ams[9].type][ams[9].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
          }
        }

        this.client?.on('interactionCreate', collector)
        setTimeout(() => this.client?.removeListener('interactionCreate', collector), 1000 * 240)
      }
      break
      case 'sword': {
        const locale = await import(`../../../../locales/${ctx.db.user.locale}/weapons`)
        var wps = weapons.filter(w => w.type === 'sword' && w.rarity < 4).slice(options[1]?.value ?? 1 * 10 - 10, options[1]?.value ?? 1 * 10).sort((a, b) => b.price! - a.price!)

        var customId = 0
        for (var weapon of wps) {
          var wp = locale.weapons[weapon.type][weapon.name]
          embed.addField(`${wp?.name} ${wp?.type} (${weapon.price?.toLocaleString()} Granex)`, await this.locale.get('commands.shop.embed.field2', {
            rarity: weapon.rarity,
            damage: weapon.damage
          }), true)

          const button = new Button()
          .setStyle('SUCCESS')
          .setLabel(`${wp?.name} ${wp?.type}`)
          .setCustomId(`${customId++}`)

          if (customId <= 5) row.addComponent(button)
          else row2.addComponent(button)
        }

        const msg: any = await ctx.reply({
          embed,
          components: [row, row2]
        })

        const collector = async (i: ComponentInteraction) => {
          if (i.message?.id !== msg.id) return
          if (i.channel.id !== ctx.interaction.channel.id) return

          const user = await User.findById(i.member?.id)

          await i.defer(64)
          if (user?.inventory?.weapons.length! >= 25) return i.createMessage(await this.locale.get('helper.limit_of_weapons'))

          switch (i.data.custom_id) {
            case '0': {
              if (user!.granex < wps[0].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[0].price!
              user?.inventory?.weapons.push(wps[0])
              user?.save()

              var wp = locale.weapons[wps[0].type][wps[0].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '1': {
              if (user!.granex < wps[1].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[0].price!
              user?.inventory?.weapons.push(wps[1])
              user?.save()

              var wp = locale.weapons[wps[1].type][wps[1].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '2': {
              if (user!.granex < wps[2].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[2].price!
              user?.inventory?.weapons.push(wps[2])
              user?.save()

              var wp = locale.weapons[wps[2].type][wps[2].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '3': {
              if (user!.granex < wps[3].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[3].price!
              user?.inventory?.weapons.push(wps[3])
              user?.save()

              var wp = locale.weapons[wps[3].type][wps[3].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '4': {
              if (user!.granex < wps[4].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[4].price!
              user?.inventory?.weapons.push(wps[4])
              user?.save()

              var wp = locale.weapons[wps[4].type][wps[4].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '5': {
              if (user!.granex < wps[5].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[5].price!
              user?.inventory?.weapons.push(wps[5])
              user?.save()

              var wp = locale.weapons[wps[5].type][wps[5].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '6': {
              if (user!.granex < wps[6].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[6].price!
              user?.inventory?.weapons.push(wps[6])
              user?.save()

              var wp = locale.weapons[wps[6].type][wps[6].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '7': {
              if (user!.granex < wps[7].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[7].price!
              user?.inventory?.weapons.push(wps[7])
              user?.save()

              var wp = locale.weapons[wps[7].type][wps[7].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '8': {
              if (user!.granex < wps[8].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[8].price!
              user?.inventory?.weapons.push(wps[8])
              user?.save()

              var wp = locale.weapons[wps[8].type][wps[8].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '9': {
              if (user!.granex < wps[9].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[9].price!
              user?.inventory?.weapons.push(wps[9])
              user?.save()

              var wp = locale.weapons[wps[9].type][wps[9].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
          }
        }

        this.client?.on('interactionCreate', collector)
        setTimeout(() => this.client?.removeListener('interactionCreate', collector), 1000 * 240)
      }
      break
      case 'broad_sword': {
        const locale = await import(`../../../../locales/${ctx.db.user.locale}/weapons`)
        var wps = weapons.filter(w => w.type === 'broad_sword' && w.rarity < 4).slice(options[1]?.value ?? 1 * 10 - 10, options[1]?.value ?? 1 * 10).sort((a, b) => b.price! - a.price!)

        var customId = 0
        for (var weapon of wps) {
          var wp = locale.weapons[weapon.type][weapon.name]
          embed.addField(`${wp?.name} ${wp?.type} (${weapon.price?.toLocaleString()} Granex)`, await this.locale.get('commands.shop.embed.field2', {
            rarity: weapon.rarity,
            damage: weapon.damage
          }), true)

          const button = new Button()
          .setStyle('SUCCESS')
          .setLabel(`${wp?.name} ${wp?.type}`)
          .setCustomId(`${customId++}`)

          if (customId <= 5) row.addComponent(button)
          else row2.addComponent(button)
        }

        const msg: any = await ctx.reply({
          embed,
          components: [row, row2]
        })

        const collector = async (i: ComponentInteraction) => {
          if (i.message?.id !== msg.id) return
          if (i.channel.id !== ctx.interaction.channel.id) return

          const user = await User.findById(i.member?.id)

          if (user?.inventory?.weapons.length! >= 25) return ctx.reply('helper.limit_of_weapons')

          await i.defer(64)

          switch (i.data.custom_id) {
            case '0': {
              if (user!.granex < wps[0].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[0].price!
              user?.inventory?.weapons.push(wps[0])
              user?.save()

              var wp = locale.weapons[wps[0].type][wps[0].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '1': {
              if (user!.granex < wps[1].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[0].price!
              user?.inventory?.weapons.push(wps[1])
              user?.save()

              var wp = locale.weapons[wps[1].type][wps[1].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '2': {
              if (user!.granex < wps[2].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[2].price!
              user?.inventory?.weapons.push(wps[2])
              user?.save()

              var wp = locale.weapons[wps[2].type][wps[2].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '3': {
              if (user!.granex < wps[3].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[3].price!
              user?.inventory?.weapons.push(wps[3])
              user?.save()

              var wp = locale.weapons[wps[3].type][wps[3].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '4': {
              if (user!.granex < wps[4].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[4].price!
              user?.inventory?.weapons.push(wps[4])
              user?.save()

              var wp = locale.weapons[wps[4].type][wps[4].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '5': {
              if (user!.granex < wps[5].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[5].price!
              user?.inventory?.weapons.push(wps[5])
              user?.save()

              var wp = locale.weapons[wps[5].type][wps[5].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '6': {
              if (user!.granex < wps[6].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[6].price!
              user?.inventory?.weapons.push(wps[6])
              user?.save()

              var wp = locale.weapons[wps[6].type][wps[6].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '7': {
              if (user!.granex < wps[7].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[7].price!
              user?.inventory?.weapons.push(wps[7])
              user?.save()

              var wp = locale.weapons[wps[7].type][wps[7].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '8': {
              if (user!.granex < wps[8].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[8].price!
              user?.inventory?.weapons.push(wps[8])
              user?.save()

              var wp = locale.weapons[wps[8].type][wps[8].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
            break
            case '9': {
              if (user!.granex < wps[9].price!) return i.createMessage(await this.locale.get('helper.dont_have_granex'))

              user!.granex -= wps[9].price!
              user?.inventory?.weapons.push(wps[9])
              user?.save()

              var wp = locale.weapons[wps[9].type][wps[9].name]
              i.createMessage(await this.locale.get('commands.shop.done', {
                item: `${wp?.name} ${wp?.type}`,
              }))
            }
          }
        }

        this.client?.on('interactionCreate', collector)
        setTimeout(() => this.client?.removeListener('interactionCreate', collector), 1000 * 240)
      }
      break
      case 'fill_energy': {
        const user = await User.findById(ctx.member.id)
        if (user!.granex < 200) return ctx.reply('helper.dont_have_granex')

        user!.energy = 500
        user!.granex -= 200
        user?.save()

        ctx.reply('commands.shop.restored')
      }
    }
  }
} 