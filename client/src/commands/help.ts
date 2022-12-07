import { App, Command, CommandContext, Embed } from '../structures'
import translate from '@iamtraction/google-translate'

export default class HelpCommand extends Command {
  constructor (client: App) {
    super({
      name: 'help',
      name_localizations: {
        'pt-BR': 'ajuda'
      },
      description: 'View my commands',
      description_localizations: {
        'pt-BR': 'Veja meus comandos'
      },
      botPermissions: ['embedLinks'],
      client,
      category: 'util'
    })
  }

  async run (ctx: CommandContext) {
    const commands: any[] = []
    this.client?.commands.forEach(cmd => commands.push(cmd))

    const embed = new Embed()
    .setTitle(await this.locale.get('commands.help.embed.title'))
    .setThumbnail(this.client?.user.avatarURL!)

    const categories = commands.map(cmd => cmd.category).filter((a, b, c) => c.indexOf(a) === b)
    categories.forEach(category => {
      const cmds = commands.filter(cmd => cmd.category === category)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(cmd => `\`/${cmd.name}\``)
      .join(', ')

      if (category) embed.addField(category, cmds)
    })

    embed.setDescription(await this.locale.get('commands.help.embed.description'))

    ctx.reply(embed.build())
  }
}