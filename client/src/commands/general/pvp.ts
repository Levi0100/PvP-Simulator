import { ActionRowComponents, ComponentInteraction } from 'eris'
import { User } from '../../../../database'
import { App, Battle, Button, Command, CommandContext } from '../../structures'

interface CommandOptions {
  type: number
  options: any[]
  name: string
}

export default class PvPCommand extends Command {
  constructor (client: App) {
    super({
      name: 'pvp',
      description: 'Starts a PvP match',
      description_localizations: {
        'pt-BR': 'Inicia uma partida de PvP'
      },
      options: [
        {
          type: 2,
          name: 'start',
          name_localizations: {
            'pt-BR': 'iniciar'
          },
          description: 'Starts a PvP match',
          description_localizations: {
            'pt-BR': 'Inicia uma partida de PvP'
          },
          options: [
            {
              type: 1,
              name: 'normal',
              description: 'Start a normal PvP match',
              description_localizations: {
                'pt-BR': 'Inicia uma partida normal de PvP'
              },
              options: [
                {
                  type: 6,
                  name: 'player',
                  name_localizations: {
                    'pt-BR': 'jogador'
                  },
                  description: 'Enter the player',
                  description_localizations: {
                    'pt-BR': 'Insira o jogador'
                  },
                  required: true
                }
              ]
            },
            {
              type: 1,
              name: 'bet',
              name_localizations: {
                'pt-BR': 'apostado'
              },
              description: 'Start a bet PvP match',
              description_localizations: {
                'pt-BR': 'Inicia uma partida apostada de PvP'
              },
              options: [
                {
                  type: 6,
                  name: 'player',
                  name_localizations: {
                    'pt-BR': 'jogador'
                  },
                  description: 'Enter the player',
                  description_localizations: {
                    'pt-BR': 'Insira o jogador'
                  },
                  required: true
                },
                {
                  type: 10,
                  name: 'value',
                  name_localizations: {
                    'pt-BR': 'valor'
                  },
                  description: 'Enter the bet value',
                  description_localizations: {
                    'pt-BR': 'Insira o valor da aposta'
                  },
                  required: true
                }
              ]
            }
          ]
        }
      ],
      category: 'general',
      client
    })
  }

  async run (ctx: CommandContext) {
    const option = ctx.interaction.data.options![0] as CommandOptions
    const user = await User.findById(ctx.interaction.member?.id)
    const rival = await User.findById(option.options[0].options[0].value)
    const _user = this.client?.users.get(rival?.id)
    const value = option.options[0].options[1]?.value as number

    if (!rival) return ctx.reply('helper.user_is_not_in_db')
    if (!user?.inUse?.weapon) return ctx.reply('commands.pvp.needs_weapon')
    if (user.energy < 1) return ctx.reply('commands.pvp.energy_not_enough')
    if (rival.energy < 1) return ctx.reply('commands.pvp.energy_not_enough2', {
      user: _user?.mention
    })
    if (!rival?.inUse?.weapon) return ctx.reply('commands.pvp.needs_weapon2', {
      user: _user?.mention
    })
    if (user.inMatch) return ctx.reply('commands.pvp.already_in_match')

    switch (option.options[0].name) {
      case 'bet': {
        if (user.granex < value) return ctx.reply('helper.dont_have_granex')
        if (rival.granex < value) return ctx.reply('helper.dont_have_granex2', {
          user: _user?.mention
        })

        const button = new Button()
        .setStyle('SUCCESS')
        .setLabel(await this.locale.get('commands.pvp.button.label'))
        .setCustomId('accept-pvp')

        const msg: any = await ctx.reply(button.build(await this.locale.get('commands.pvp.request', {
          author: ctx.interaction.member?.mention,
          value: value.toLocaleString(),
          user: _user?.mention
        })))

        const collector = async (i: ComponentInteraction): Promise<void> => {
          if (i.channel.id !== msg.channel.id) return
          if (i.message.id !== msg.id) return

          console.log(i.data.custom_id)

          switch (i.data.custom_id) {
            case 'accept-pvp': {
              if (i.member?.id !== _user?.id) return
              if (!rival?.inUse?.weapon) {
                await i.defer(64)
                return i.createMessage(await this.locale.get('commands.pvp.needs_weapon'))
              }
              if (rival.inMatch) {
                await i.defer(64)
                return i.createMessage(await this.locale.get('commands.pvp.already_in_match'))
              }

              await i.deferUpdate()
    
              ctx.edit({
                content: await this.locale.get('commands.pvp.starting'),
                components: []
              })
              
              rival.inMatch = true
              user.inMatch = true
              rival.save()
              user.save()

              const attack = new Button()
              .setStyle('DANGER')
              .setLabel(await this.locale.get('commands.pvp.button.attack'))
              .setCustomId('attack')

              setTimeout(async () => {
                ctx.edit({
                  content: '',
                  components: [{
                    type: 1,
                    components: [attack]
                  }]
                })
              }, 10000)
            }
            break
            case 'attack': {
              if (![rival.id, user.id].includes(i.member?.id)) return
              await i.deferUpdate()
              if (i.member?.id === ctx.interaction.member?.id) new Battle(ctx, ctx.interaction.member!, _user!, this.locale, value).initBattle()
              else new Battle(ctx, _user!, ctx.interaction.member!, this.locale, value).initBattle()
            }
          }
        }

        this.client?.on('interactionCreate', collector)
      }
      break
      case 'normal': {
        const button = new Button()
        .setStyle('SUCCESS')
        .setLabel(await this.locale.get('commands.pvp.button.label'))
        .setCustomId('accept-pvp')

        const msg: any = await ctx.reply(button.build(await this.locale.get('commands.pvp.request2', {
          author: ctx.interaction.member?.mention,
          user: _user?.mention
        })))

        const collector = async (i: ComponentInteraction): Promise<void> => {
          if (i.channel.id !== msg.channel.id) return
          if (i.message.id !== msg.id) return

          switch (i.data.custom_id) {
            case 'accept-pvp': {
              if (i.member?.id !== _user?.id) return
              if (!rival?.inUse?.weapon) {
                await i.defer(64)
                return i.createMessage(await this.locale.get('commands.pvp.needs_weapon'))
              }
              if (rival.inMatch) {
                await i.defer(64)
                return i.createMessage(await this.locale.get('commands.pvp.already_in_match'))
              }

              await i.deferUpdate()
    
              ctx.edit({
                content: await this.locale.get('commands.pvp.starting'),
                components: []
              })
              
              rival.inMatch = true
              user.inMatch = true
              rival.save()
              user.save()

              const attack = new Button()
              .setStyle('DANGER')
              .setLabel(await this.locale.get('commands.pvp.button.attack'))
              .setCustomId('attack')

              setTimeout(async () => {
                ctx.edit({
                  content: '',
                  components: [{
                    type: 1,
                    components: [attack]
                  }]
                })
              }, 10000)
            }
            break
            case 'attack': {
              if (![rival.id, user.id].includes(i.member?.id)) return
              await i.deferUpdate()
              if (i.member?.id === ctx.interaction.member?.id) new Battle(ctx, ctx.interaction.member!, _user!, this.locale).initBattle()
              else new Battle(ctx, _user!, ctx.interaction.member!, this.locale).initBattle()
            }
          }
        }

        this.client?.on('interactionCreate', collector)
      }
    }
  }
}