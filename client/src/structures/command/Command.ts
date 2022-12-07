import { App } from '..'

interface SubCommandOptions {
  type: number
  name: string
  name_localizations?: {
    'pt-BR': string
  }
  description: string
  description_localizations?: {
    'pt-BR': string
  }
  choices?: Array<{
    name: string
    name_localizations?: {
      'pt-BR': string
    }
    value: string
  }>
  required?: boolean
}

interface Option {
  type: number
  name: string
  name_localizations?: {
    'pt-BR': string
  }
  description: string
  description_localizations?: {
    'pt-BR': string
  }
  choices?: Array<{
    name: string
    name_localizations?: {
      'pt-BR': string
    }
    value: string
  }>
  required?: boolean
  options?: SubCommandOptions[]
}

interface ICommandOption {
  type: number
  name: string
  name_localizations?: {
    'pt-BR': string
  }
  description: string
  description_localizations?: {
    'pt-BR': string
  }
  choices?: Array<{
    name: string
    name_localizations?: {
      'pt-BR': string
    }
    value: string
  }>
  required?: boolean
  options?: Option[]
}

interface CommandOptions {
  name: string
  name_localizations?: {
    'pt-BR': string
  }
  description: string
  description_localizations?: {
    'pt-BR': string
  }
  options?: ICommandOption[]
  dev?: boolean
  permissions?: Array<'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' | 'addReactions' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' | 'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageEmojisAndStickers' | 'useExternalEmojis' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'voiceStream' | 'viewChannel' | 'viewGuildInsights' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' | 'voiceRequestToSpeak' | 'voiceDeafenMembers' | 'voiceMoveMembers' | 'manageWebhooks' | 'useApplicationCommands' | 'createPrivateThreads' | 'createPublicThreads' | 'useExternalStickers' | 'manageThreads' | 'sendMessagesInThreads' | 'useEmbeddedActivities' | 'moderateMembers' | 'manageEvents'>
  botPermissions?: Array<'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' | 'addReactions' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' | 'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageEmojisAndStickers' | 'useExternalEmojis' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'voiceStream' | 'viewChannel' | 'viewGuildInsights' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' | 'voiceRequestToSpeak' | 'voiceDeafenMembers' | 'voiceMoveMembers' | 'manageWebhooks' | 'useApplicationCommands' | 'createPrivateThreads' | 'createPublicThreads' | 'useExternalStickers' | 'manageThreads' | 'sendMessagesInThreads' | 'useEmbeddedActivities' | 'moderateMembers' | 'manageEvents'>
  client?: App
  category?: string
  ephemeral?: boolean
}

class Command {
  name: string
  name_localizations?: {
    'pt-BR': string
  }
  description: string
  description_localizations?: {
    'pt-BR': string
  }
  options?: ICommandOption[]
  dev?: boolean
  permissions?: Array<'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' | 'addReactions' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' | 'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageEmojisAndStickers' | 'useExternalEmojis' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'voiceStream' | 'viewChannel' | 'viewGuildInsights' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' | 'voiceRequestToSpeak' | 'voiceDeafenMembers' | 'voiceMoveMembers' | 'manageWebhooks' | 'useApplicationCommands' | 'createPrivateThreads' | 'createPublicThreads' | 'useExternalStickers' | 'manageThreads' | 'sendMessagesInThreads' | 'useEmbeddedActivities' | 'moderateMembers' | 'manageEvents'>
  botPermissions?: Array<'createInstantInvite' | 'kickMembers' | 'banMembers' | 'administrator' | 'manageChannels' | 'manageGuild' | 'addReactions' | 'sendMessages' | 'sendTTSMessages' | 'manageMessages' | 'embedLinks' | 'attachFiles' | 'readMessageHistory' | 'mentionEveryone' | 'voiceUseVAD' | 'changeNickname' | 'manageNicknames' | 'manageRoles' | 'manageEmojisAndStickers' | 'useExternalEmojis' | 'viewAuditLog' | 'voicePrioritySpeaker' | 'voiceStream' | 'viewChannel' | 'viewGuildInsights' | 'voiceConnect' | 'voiceSpeak' | 'voiceMuteMembers' | 'voiceRequestToSpeak' | 'voiceDeafenMembers' | 'voiceMoveMembers' | 'manageWebhooks' | 'useApplicationCommands' | 'createPrivateThreads' | 'createPublicThreads' | 'useExternalStickers' | 'manageThreads' | 'sendMessagesInThreads' | 'useEmbeddedActivities' | 'moderateMembers' | 'manageEvents'>
  client?: App
  locale!: {
    get: (content: string, args?: object) => Promise<string>
  }
  category?: string
  ephemeral?: boolean

  constructor (options: CommandOptions) {
    this.name = options.name
    this.name_localizations = options.name_localizations
    this.description = options.description
    this.description_localizations = options.description_localizations
    this.client = options.client
    this.options = options.options
    this.permissions = options.permissions
    this.botPermissions = options.botPermissions
    this.category = options.category
    this.ephemeral = options.ephemeral
  }
}

export default Command