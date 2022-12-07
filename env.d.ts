declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      OWNER_ID: string
      MONGO_URI: string
      ERROR_LOG: string
      BOT_INVITE: string
      GUILDS_LOG: string
      COMMANDS_LOG: string
      BACKGROUNDS_LOG: string
      SUPPORT_SERVER: string
    }
  }
}

export { }