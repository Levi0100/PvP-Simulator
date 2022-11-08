import { Member, User } from 'eris'
import CommandContext from '../../command/CommandContext'

export default class Battle {
  ctx: CommandContext
  author: Member
  user: User
  locale: any
  finished?: boolean

  public constructor (ctx: CommandContext, author: Member, user: User, locale: any) {
    this.ctx = ctx
    this.author = author
    this.user = user
    this.locale = locale
  }

  public init () {
    setInterval (() => { this.initBattle() }, 10000)
  }

  private initBattle () {
    var arrayPlayers = [
      this.author,
      this.user
    ]
    var user1 = arrayPlayers[Math.floor(Math.random() * arrayPlayers.length)]
    arrayPlayers.splice(arrayPlayers.indexOf(user1), 1)
    var user2 = arrayPlayers[0]

    this.ctx.reply('commands.pvp.tried_attack', {
      user: user2.mention,
      author: user1.mention
    })
  }
}