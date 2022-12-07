import { App, Command, CommandContext } from '../structures'

export default class PingCommand extends Command {
  constructor (client: App) {
    super({
      name: 'ping',
      description: 'Bot latency',
      description_localizations: {
        'pt-BR': 'Latência do Bot'
      },
      client,
      category: 'misc'
    })
  }

  async run (ctx: CommandContext) {
    const time = 40000 - (Date.now() - this.client!.startTime)

    if (ctx.guild.shard.latency === Infinity) {
      return ctx.reply('commands.ping.wait', {
        time: `<t:${parseInt(((Date.now() + time) / 1000).toString())}:R>`
      })
    }
    ctx.reply(`Pong! \`${ctx.guild.shard.latency}ms\` (Shard ${ctx.guild.shard.id})`)
  }
}