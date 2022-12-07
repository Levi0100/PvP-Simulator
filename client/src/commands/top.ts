import { User } from '../../../database'
import { App, Command, CommandContext, Embed } from '../structures'

interface CommandOptions {
  name?: string
  value?: number
  type?: number
  options?: any[]
}

export default class TopCommand extends Command {
  constructor (client: App) {
    super({
      name: 'top',
      description: 'View the top granex',
      description_localizations: {
        'pt-BR': 'Veja o top granex'
      },
      options: [
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
    var users = await User.find(
      {
        granex: {
          $gte: 1
        }
      }
    )
    users.sort((a, b) => b.granex - a.granex)

    const options = ctx.interaction.data.options as CommandOptions[]

    if (!options || options[0].value === 1) users = users.slice(0, 10)
    else users = users.slice(options[0].value! * 10 - 10, options[0].value! * 10)

    if (!users[0]) return ctx.reply('commands.top.dont_have_more_pages')

    const embed = new Embed()
    .setAuthor(await this.locale.get('commands.top.embed.author', {
      page: options ? options[0].value : 1
    }), this.client?.user.avatarURL)
    .setTitle(await this.locale.get('commands.top.embed.title'))

    var pos = 1
    if (options) pos *= options[0].value! * 10 - 9
    for (const user of users) {
      const _user = await this.client?.getRESTUser(user.id)
      embed.addField(`${pos++}º ${_user?.username}#${_user?.discriminator}`, `${user.granex.toLocaleString()} granex`)
    }

    var index = users.findIndex(user => user.id === ctx.member.id) + 1

    const _user = await this.client?.getRESTUser(users[0].id)
    embed.setThumbnail(_user?.avatarURL!)
    embed.setFooter(await this.locale.get('commands.top.embed.footer', {
      pos: index
    }))

    ctx.reply(embed.build())
  }
}