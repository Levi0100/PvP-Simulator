import App from '../client/App'
import Eris, { CommandInteraction } from 'eris'
import { Guild, User } from '../../../../database'
import CommandContext from './CommandContext'
import { get } from '../../../../locales'

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
    const guild = await Guild.findById(this.interaction.guildID)
    const user = await User.findById(this.interaction.member.id)
    const db = {
      user,
      guild
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
        permission: command.permissions.map((perm: string) => `\`${permissions.default[perm]}\``).join(', ')
      })
    }

    if (command.botPermissions) {
      var arrayPerm: any[] = []

      var member = ctx.guild.members.get(this.client.user.id)
      for (const perm of command.botPermissions) {
        if (!member?.permissions.has(perm)) arrayPerm.push(perm)
      }

      if (arrayPerm[0]) return ctx.reply('helper.permissions.bot', {
        permission: command.permissions.map((perm: string) => `\`${permissions[perm]}\``).join(', ')
      })
    }

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
        //new Logger(this.client).error(err)
      }
    }
    command.getUser = async (user: string) => {
      try {
        return this.client.getRESTUser(user.replace(/[<@!>]/g, ''))
      }
      catch (err) {
        //new Logger(this.client).error(err)
      }
    }

    command.run(ctx)
    .catch((error: any) => {
      //new Logger(this.client).error(error)
      console.error(error)
      ctx.reply('helper.error', { error })
    })
  }
}