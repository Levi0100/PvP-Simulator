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
    
    await this.interaction.defer()

    const command = this.client.commands.get(this.interaction.data.name)

    if (!command) return

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
        permissions: command.permissions.map((perm: string) => `\`${permissions[perm]}\``).join(', ')
      })
    }

    if (command.category === 'general' && !user && command.name !== 'start') return ctx.reply('helper.you_dont_have_data')

    command.locale = {
      get: async (content: string, args?: object) => {
        return await get(this.locale, content, args)
      }
    }
    command.getMember = (member: string) => {
      try {
        return ctx.guild.members.get(member.replace(/[<@!>]/g, ''))
      }
      catch (err) {
        new Logger(this.client).error(err as Error)
      }
    }
    command.getUser = async (user: string) => {
      try {
        return this.client.getRESTUser(user.replace(/[<@!>]/g, ''))
      }
      catch (err) {
        new Logger(this.client).error(err as Error)
      }
    }

    command.run(ctx)
    .catch((error: Error) => {
      new Logger(this.client).error(error)
      ctx.reply('helper.error', { error })
    })
    .then(async () => {
      const embed = new Embed()
      .setAuthor(`${ctx.interaction.member?.username}#${ctx.interaction.member?.discriminator}`, ctx.interaction.member?.avatarURL)
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
          value: `\`${ctx.interaction.member?.username}#${ctx.interaction.member?.discriminator} (${ctx.interaction.member?.id})\``,
          inline: true
        }
      ])
      .setThumbnail(ctx.guild.iconURL!)
      .setTimestamp()

      const channel = await this.client.getRESTChannel('1044446654000009217') as TextChannel
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