import c from 'colors'
import { TextChannel, WebhookPayload } from 'eris'
import moment from 'moment'
import App from '../client/App'
import Embed from '../embed/Embed'
moment.locale('pt-br')

export default class Logger {
  client: App

  public constructor (client: App) {
    this.client = client
  }
  public static send (message: string) {
    return console.log(c.green(`[${moment(Date.now()).format('hh:mm')}] ${message}`))
  }
  public static warn (message: string) {
    return console.log(c.yellow(`[${moment(Date.now()).format('hh:mm')}] ${message}`))
  }
  public async error (error: Error) {
    const embed = new Embed()
    .setTitle('An error has occurred...')
    .setDescription(`\`\`\`${error.stack}\`\`\``)
    .setTimestamp()

    const channel = await this.client.getRESTChannel('1040758368513560606') as TextChannel
    const webhooks = await channel.getWebhooks()
    var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Logger`)[0]
    if (!webhook) webhook = await channel.createWebhook({ name: `${this.client.user.username} Logger` })

    this.client.executeWebhook(webhook.id, webhook.token!, {
      embed,
      avatarURL: this.client.user.avatarURL,
      username: `${this.client.user.username} Logger`
    } as WebhookPayload)

    console.log(c.red(`[${moment(Date.now()).format('hh:mm')}] ${error.stack}`))
  }
}