import App from '../client/App'
import { Guild, CommandInteraction, AdvancedMessageContent, AdvancedMessageContentEdit, Member, User } from 'eris'
import { get } from '../../../../locales'

export default class CommandContext {
  client: App
  db: any
  guild: Guild
  interaction: CommandInteraction
  locale: any
  member: Member
  author: User

  constructor(client: App, db: any, guild: Guild, interaction: CommandInteraction, locale: any) {
    this.client = client
    this.db = db
    this.guild = guild
    this.interaction = interaction
    this.locale = locale
    this.member = this.interaction.member!
    this.author = this.client.users.get(this.member.id)!
  }

  async reply (content: string | AdvancedMessageContent | object, options?: object | any) {
    switch (typeof content) {
      case 'string': {
        if (options?.name && options?.file) {
          return this.interaction.createMessage(
            {
              content: await get(this.locale, content ?? content, options)
            },
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.createMessage(
          {
            content: await get(this.locale, content, options)
          }
        )
      }
      case 'object': {
        if (options?.options && options?.name) {
          return this.interaction.createMessage(Object.assign(content),
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.createMessage(Object.assign(content))
      }
    }
  }

  async edit (content: string | AdvancedMessageContentEdit | object, options?: object | any) {
    switch (typeof content) {
      case 'string': {
        if (options?.name && options?.file) {
          return this.interaction.editOriginalMessage(
            {
              content: await get(this.locale, content ?? content, options)
            },
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.editOriginalMessage(
          {
            content: await get(this.locale, content, options)
          }
        )
      }
      case 'object': {
        if (options?.options && options?.name) {
          return this.interaction.editOriginalMessage(Object.assign(content),
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.editOriginalMessage(Object.assign(content))
      }
    }
  }
}