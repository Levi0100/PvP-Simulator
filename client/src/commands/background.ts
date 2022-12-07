import { ActionRowComponents, Attachment, TextChannel } from 'eris'
import { User } from '../../../database'
import { App, Button, Command, CommandContext, Embed } from '../structures'

interface Resolved {
  attachments: any
}

interface CommandOptions {
  value: string
}

export default class BackgroundCommand extends Command {
  constructor (client: App) {
    super({
      name: 'background',
      description: 'Change your background profile',
      description_localizations: {
        'pt-BR': 'Altere seu background de perfil'
      },
      options: [
        {
          type: 11,
          name: 'file',
          name_localizations: {
            'pt-BR': 'arquivo'
          },
          description: 'Attach a file',
          description_localizations: {
            'pt-BR': 'Anexe um arquivo'
          },
          required: true
        }
      ],
      category: 'general',
      ephemeral: true,
      client
    })
  }
  async run (ctx: CommandContext) {
    const user = await User.findById(ctx.author.id)
    if (user?.alreadySentBackground) return ctx.reply('commands.background.already_sent')
    const resolved = ctx.interaction.data.resolved as Resolved
    const option = ctx.interaction.data.options![0] as CommandOptions
    const attachment: Attachment = resolved.attachments[option.value]

    user!.alreadySentBackground = true

    const channel = this.client?.getChannel(process.env.BACKGROUNDS_LOG) as TextChannel
    const embed = new Embed()
    .setAuthor(`${ctx.author.username}#${ctx.author.discriminator}`)
    .setDescription(`\`${ctx.author.username}#${ctx.author.discriminator} (${ctx.author.id})\` sent a background for analysis`)
    .setThumbnail(ctx.author.avatarURL)
    .setImage(attachment.url)
    .setFooter(ctx.author.id)
    .setTimestamp()

    const approve = new Button()
    .setStyle('SUCCESS')
    .setLabel('Approve')
    .setCustomId('approve')

    const reprove = new Button()
    .setStyle('DANGER')
    .setLabel('Reprove')
    .setCustomId('reprove')

    await channel.createMessage({
      embed,
      components: [{
        type: 1,
        components: [approve, reprove] as ActionRowComponents[]
      }]
    })

    const button = new Button()
    .setStyle('LINK')
    .setLabel(await this.locale.get('helper.server'))
    .setURL(process.env.SUPPORT_SERVER)
    ctx.reply(button.build(await this.locale.get('commands.background.done')))

    user?.save()
  }
}