import { Guild, TextChannel, WebhookPayload } from 'eris'
import { App, Embed, Listener } from '../../structures'

export default class GuildDeleteListener extends Listener {
  constructor (client: App) {
    super({
      name: 'guildDelete',
      client
    })
  }
  async on (guild: Guild) {
    const embed = new Embed()
    .setTitle(`I've been removed from \`${guild.name}\``)
    .addFields([
      {
        name: 'Server ID',
        value: `\`${guild.id}\``,
        inline: true
      },
      {
        name: 'Owner',
        value: `\`${guild.ownerID}\``,
        inline: true
      },
      {
        name: 'Members',
        value: `Humans: ${guild.members.filter(m => !m.bot).length}\nBots: ${guild.members.filter(m => m.bot).length}\nTotal: ${guild.memberCount}`,
        inline: true
      }
    ])
    .setFooter(`Now I'm on ${this.client?.guilds.size.toLocaleString()} guilds`)
    .setThumbnail(guild.iconURL!)
    .setTimestamp()

    const channel = await this.client?.getRESTChannel('1040850696834125824') as TextChannel
    const webhooks = await channel.getWebhooks()
    var webhook = webhooks.filter(w => w.name === `${this.client?.user.username} Logger`)[0]
    if (!webhook) webhook = await channel.createWebhook({ name: `${this.client?.user.username} Logger` })

    this.client?.executeWebhook(webhook.id, webhook.token!, {
      embed,
      avatarURL: this.client.user.avatarURL,
      username: `${this.client.user.username} Logger`
    } as WebhookPayload)
  }
}