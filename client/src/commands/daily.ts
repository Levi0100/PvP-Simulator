import { Command, CommandContext } from '../structures'

export default class DailyCommand extends Command {
  constructor () {
    super({
      name: 'daily',
      name_localizations: {
        'pt-BR': 'diário'
      },
      description: 'Get your daily prize',
      description_localizations: {
        'pt-BR': 'Pegue seu prêmio diário'
      },
      category: 'general'
    })
  }

  async run (ctx: CommandContext) {
    if (ctx.db.user.dailyTime > Date.now()) return ctx.reply('commands.daily.has_been_picked', {
      time: `<t:${parseInt(((ctx.db.user.dailyTime) / 1000).toString())}:R>`
    })
    
    var granex = Math.floor(Math.random() * (500 - 150) + 150)
    ctx.db.user.dailyTime = new Date().setHours(24, 0, 0, 0)
    ctx.db.user.granex += granex

    ctx.reply('commands.daily.congrats', {
      granex
    })
    
    var percentual = Math.random() * 100

    if (percentual <= 5) {
      var refinedGranex = Math.floor(Math.random() * (9 - 2) + 2)

      ctx.db.user.refinedGranex += refinedGranex
      
      ctx.reply('commands.daily.congrats2', {
        refinedGranex
      })
    }

    ctx.db.user.save()
  }
}