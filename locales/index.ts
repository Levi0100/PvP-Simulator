import { readFileSync } from 'fs'

const get = async (lang: string, content: string, args?: any) => {
  var locale = await import(`./${lang}/locales`)

  for (const file of content.split('.')) {
    locale = locale[file]
    if (!locale) return content
  }

  if (args) {
    for (const arg of Object.keys(args)) {
      locale = locale.replaceAll(`{${arg}}`, args[arg])
    }
  }
  return locale
}

export {
  get
}