import { createCanvas, loadImage } from 'canvas'
import { User } from '../../../../database'
import { App, Command, CommandContext } from '../../structures'
import { fillTextWithTwemoji } from 'node-canvas-with-twemoji-and-discord-emoji'

interface CommandOptions {
  type: number
  name: string
  value: string
}

export default class ProfileCommand extends Command {
  constructor (client: App) {
    super({
      name: 'profile',
      name_localizations: {
        'pt-BR': 'perfil'
      },
      description: 'Shows your profile',
      description_localizations: {
        'pt-BR': 'Mostra seu perfil'
      },
      options: [
        {
          type: 6,
          name: 'player',
          name_localizations: {
            'pt-BR': 'jogador'
          },
          description: 'Enter the player',
          description_localizations: {
            'pt-BR': 'Insira o jogador'
          }
        }
      ],
      client
    })
  }

  async run (ctx: CommandContext) {
    const options = ctx.interaction.data.options as CommandOptions[]
    const canvas = createCanvas(1920, 1080)
    const context = canvas.getContext('2d')
    const _canvas = createCanvas(1920, 1080)
    const _context = _canvas.getContext('2d')
    const _user = await this.client?.getRESTUser((options ? options![0].value : ctx.interaction.member?.id) as string)
    const user = await User.findById(_user?.id)
    if (!user) return ctx.reply('helper.user_is_not_in_db')

    const template = await loadImage('https://imgur.com/1wp1OvT.png')
    const background = await loadImage(user.background ?? 'https://imgur.com/yq3R7PT.png')
    const avatar = await loadImage(_user?.avatarURL!)

    _context.beginPath()
    _context.arc(960, 540, 205, 0, Math.PI * 2, true)
    _context.closePath()
    _context.clip()
    _context.stroke()
    _context.drawImage(avatar, 755, 335, 410, 410)

    var avatarImg = _canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height)
    context.drawImage(avatarImg, 0, 0, canvas.width, canvas.height)
    context.drawImage(template, 0, 0, canvas.width, canvas.height)

    context.font = '78px bold'
    context.fillStyle = '#ffffff'
    context.fillText(`${_user?.username}#${_user?.discriminator}`, 521, 960)

    context.font = '40px regular'
    context.fillStyle = '#ffffff'
    context.fillText(user.energy.toString(), 101, 128)
    await fillTextWithTwemoji(context, '<:granex:874481096799186955>', 41, 84)

    context.font = '40px regular'
    context.fillStyle = '#ffffff'
    context.fillText(user.granex.toLocaleString(), 101, 83)
    await fillTextWithTwemoji(context, '⚡', 41, 129)

    context.font = '40px regular'
    context.fillStyle = '#ffffff'
    context.fillText(user.wins.toString(), 101, 173)
    await fillTextWithTwemoji(context, '🏆', 41, 174)

    ctx.reply('', {
      file: canvas.toBuffer(),
      name: 'profile.png'
    })
  }
}