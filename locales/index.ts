import { readFileSync } from 'fs'

const get = (lang: string, content: string, args?: any) => {
  var locale = JSON.parse(readFileSync(`locales/${lang}/locales.json`, 'utf-8'))

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