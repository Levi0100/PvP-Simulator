declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      OWNER_ID: string
      MONGO_URI: string
      BOT_INVITE: string
    }
  }
}

export { }