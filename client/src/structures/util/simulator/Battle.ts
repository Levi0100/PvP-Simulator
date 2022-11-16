import Eris, { Member } from 'eris'
import { User } from '../../../../../database'
import CommandContext from '../../command/CommandContext'
import Button from '../../components/Button'

export default class Battle {
  ctx: CommandContext
  user1: Member | Eris.User
  user2: Eris.User | Member
  locale: any
  finished?: boolean
  value?: number
  bet?: boolean

  public constructor (ctx: CommandContext, user1: Member | Eris.User, user2: Eris.User | Member, locale: any, value?: number) {
    this.ctx = ctx
    this.user1 = user1
    this.user2 = user2
    this.locale = locale
    this.value = value
    if (this.value) this.bet = true
  }

  public async initBattle () {
    if (this.finished) return
    
    const p1 = await User.findById(this.user1.id)
    const p2 = await User.findById(this.user2.id)

    var damage = p1?.inUse?.weapon.damage
    if (p2?.inUse?.boots) damage -= p2?.inUse?.boots.def
    if (p2?.inUse?.chest) damage -= p2?.inUse?.chest.def
    if (p2?.inUse?.helmet) damage -= p2?.inUse?.helmet.def
    if (p2?.inUse?.pants) damage -= p2?.inUse?.pants.def
    if (p2?.inUse?.weapon.type === 'broad_sword') damage += 6
    if (damage < 0) damage = 0

    p2!.energy -= damage
    if (p2!.energy < 0) p2!.energy = 0

    this.ctx.edit({
      content: await this.locale.get('commands.pvp.attack', {
        user: this.user2.mention,
        author: this.user1.mention,
        damage,
        energy: p2?.energy
      }),
      components: []
    })

    p2?.save()

    if (p2!.energy <= 0) {
      this.finished = true
      return this.checkWinner(this.user1 as Member, this.user2 as Eris.User)
    }

    setTimeout(async () => {
      const a1 = new Button()
      .setStyle('DANGER')
      .setLabel(await this.locale.get('commands.pvp.button.attack'))
      .setCustomId('attack1')
      .setDisabled()

      const a2 = new Button()
      .setStyle('DANGER')
      .setLabel(await this.locale.get('commands.pvp.button.attack'))
      .setCustomId('attack2')
      .setDisabled()

      const a3 = new Button()
      .setStyle('DANGER')
      .setLabel(await this.locale.get('commands.pvp.button.attack'))
      .setCustomId('attack3')
      .setDisabled()

      const a4 = new Button()
      .setStyle('DANGER')
      .setLabel(await this.locale.get('commands.pvp.button.attack'))
      .setCustomId('attack4')
      .setDisabled()

      const a5 = new Button()
      .setStyle('DANGER')
      .setLabel(await this.locale.get('commands.pvp.button.attack'))
      .setCustomId('attack5')
      .setDisabled()

      const a6 = new Button()
      .setStyle('DANGER')
      .setLabel(await this.locale.get('commands.pvp.button.attack'))
      .setCustomId('attack6')
      .setDisabled()
  
      switch (Math.floor(Math.random() * 6) + 1) {
        case 1: {
          a1.setEnabled()
          a1.forceCustomId('attack')
        }
        break
        case 2: {
          a2.setEnabled()
          a2.forceCustomId('attack')
        }
        break
        case 3: {
          a3.setEnabled()
          a3.forceCustomId('attack')
        }
        break
        case 4: {
          a4.setEnabled()
          a4.forceCustomId('attack')
        }
        break
        case 5: {
          a5.setEnabled()
          a5.forceCustomId('attack')
        }
        break
        case 6: {
          a6.setEnabled()
          a6.forceCustomId('attack')
        }
      }

      this.ctx.edit({
        content: '',
        components: [
          {
            type: 1,
            components: [a1, a2, a3]
          },
          {
            type: 1,
            components: [a4, a5, a6]
          }
        ]
      })
    }, 10000)
  }

  private async checkWinner (user1: Member, user2: Eris.User) {
    const p1 = await User.findById(user1.id)
    const p2 = await User.findById(user2.id)

    switch (this.bet) {
      case true: {
        p1!.granex += this.value!
        p1!.wins += 1
        p2!.granex -= this.value!
        p2!.defeats += 1
  
        this.ctx.edit({
          content: await this.locale.get('commands.pvp.winner', {
            winner: user1.mention,
            value: this.value?.toLocaleString()
          }),
          components: []
        })
      }
      break
      default: {
        p1!.wins += 1
        p2!.defeats += 1

        this.ctx.edit({
          content: await this.locale.get('commands.pvp.winner2', {
            winner: user1.mention
          }),
          components: []
        })
      }
    }

    p2!.inMatch = false
    p1!.inMatch = false
    p2?.save()
    p1?.save()
  }
}