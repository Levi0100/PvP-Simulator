import App from '../client/App'
import Eris, { CommandInteraction, TextChannel, WebhookPayload } from 'eris'
import { User } from '../../../../database'
import CommandContext from './CommandContext'
import { get } from '../../../../locales'
import Logger from '../util/Logger'
import Embed from '../embed/Embed'

export default class CommandRunner {
  client: App
  interaction: CommandInteraction
  locale: string

  constructor (client: App, interaction: CommandInteraction, locale: string) {
    this.client = client
    this.interaction = interaction
    this.locale = locale
  }

  async init () {
    if (!this.interaction.member) return

    const permissions = await import(`../../../../locales/${this.locale}/permissions`)
    const user = await User.findById(this.interaction.member.id)
    const db = {
      user
    }
    const g = this.client.guilds.get(this.interaction.guildID!) as Eris.Guild
    const ctx = new CommandContext(this.client, db, g, this.interaction, this.locale)

    const command = this.client.commands.get(this.interaction.data.name)

    if (!command) return

    if (command.ephemeral) await this.interaction.defer(64)
    else await this.interaction.defer()

    if (command.permissions) {
      var arrayPerm: any[] = []

      for (const perm of command.permissions) {
        if (!this.interaction.member?.permissions.has(perm)) arrayPerm.push(perm)
      }

      if (arrayPerm[0]) return ctx.reply('helper.permissions.user', {
        permissions: command.permissions.map((perm: string) => `\`${permissions.default[perm]}\``).join(', ')
      })
    }

    if (command.botPermissions) {
      var arrayPerm: any[] = []

      var member = ctx.guild.members.get(this.client.user.id)
      for (const perm of command.botPermissions) {
        if (!member?.permissions.has(perm)) arrayPerm.push(perm)
      }

      if (arrayPerm[0]) return ctx.reply('helper.permissions.bot', {
        permissions: command.permissions!.map((perm: string) => `\`${permissions[perm]}\``).join(', ')
      })
    }

    if (command.category === 'general' && !user && command.name !== 'start') return ctx.reply('helper.you_dont_have_data')

    command.locale = {
      get: async (content: string, args?: object) => {
        return await get(this.locale, content, args)
      }
    }

    command.run(ctx)
    .catch((error: Error) => {
      new Logger(this.client).error(error)
      ctx.reply('helper.error', { error })
    })
    .then(async () => {
      const embed = new Embed()
      .setAuthor(`${ctx.member.username}#${ctx.member.discriminator}`, ctx.member.avatarURL)
      .setTitle(`The command \`${command.name}\` has been executed on \`${ctx.guild.name}\``)
      .addFields([
        {
          name: 'Server ID',
          value: `\`${ctx.guild.id}\``,
          inline: true
        },
        {
          name: 'Server Owner',
          value: `\`${ctx.guild.ownerID}\``,
          inline: true
        },
        {
          name: 'Author',
          value: `\`${ctx.member.username}#${ctx.member.discriminator} (${ctx.member.id})\``,
          inline: true
        }
      ])
      .setThumbnail(ctx.guild.iconURL!)
      .setTimestamp()

      const channel = await this.client.getRESTChannel(process.env.COMMANDS_LOG) as TextChannel
      const webhooks = await channel.getWebhooks()
      var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Logger`)[0]
      if (!webhook) webhook = await channel.createWebhook({ name: `${this.client.user.username} Logger` })
  
      this.client.executeWebhook(webhook.id, webhook.token!, {
        embed,
        avatarURL: this.client.user.avatarURL,
        username: `${this.client.user.username} Logger`
      } as WebhookPayload)
    })
  }
}