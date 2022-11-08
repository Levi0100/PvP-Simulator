import Eris, { Member } from 'eris'
import { User } from '../../../../../database'
import CommandContext from '../../command/CommandContext'

export default class Battle {
  ctx: CommandContext
  author: Member
  user: Eris.User
  locale: any
  finished?: boolean

  public constructor (ctx: CommandContext, author: Member, user: Eris.User, locale: any) {
    this.ctx = ctx
    this.author = author
    this.user = user
    this.locale = locale
  }

  public init () {
    setInterval (() => { this.initBattle() }, 10000)
  }

  private async initBattle () {
    if (this.finished) return
    
    var arrayPlayers = [
      this.author,
      this.user
    ]
    var user1 = arrayPlayers[Math.floor(Math.random() * arrayPlayers.length)]
    arrayPlayers.splice(arrayPlayers.indexOf(user1), 1)
    var user2 = arrayPlayers[0]

    const p1 = await User.findById(user1.id)
    const p2 = await User.findById(user2.id)

    var damage = p1?.inUse?.weapon.damage
    if (p2?.inUse?.boots) damage -= p2?.inUse?.boots.def
    if (p2?.inUse?.chest) damage -= p2?.inUse?.chest.def
    if (p2?.inUse?.helmet) damage -= p2?.inUse?.helmet.def
    if (p2?.inUse?.pants) damage -= p2?.inUse?.pants.def
    if (damage < 0) damage = 0

    p2!.energy -= damage

    this.ctx.reply('commands.pvp.attack', {
      user: user2.mention,
      author: user1.mention,
      damage,
      energy: p2?.energy
    })

    p2?.save()
  }
}