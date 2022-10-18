export const commands = {
  ping: {
    description: '',
    wait: 'Calma lá, meu patrão, eu acabei de inicializar! Tente novamente {time}.'
  },
  help: {
    embed: {
      title: 'Meus Comandos',
      description: 'Precisando de ajuda? Entre em meu servidor de Comunidade e Suporte para sanar suas dúvidas clicando no botão abaixo!'
    }
  },
  start: {
    you_already_created_data: 'Você já criou seus dados. Pode jogar **PvP Simulator** à vontade.',
    done: 'Seus dados foram criados com sucesso. Você já pode jogar **PvP Simulator**.'
  },
  daily: {
    has_been_picked: 'Você já coletou seu prêmio diário. Tente novamente {time}',
    congrats: 'No prêmio diário de hoje você recebeu {granex} Granex!',
    congrats2: 'Parabéns, que sortudo! Você ganhou um bônus de {refinedGranex} Granex Refinado.'
  }
}

export const helper = {
  error: 'Ocorreu um erro inesperado ao executar este comando...\n`{error}`',
  permissions: {
    user: 'Você é fraco, lhe faltam as seguintes permissões para executar este comando: {permissions}',
    bot: 'Me faltam as seguintes permissões para que este comando possa funcionar: {permissions}'
  },
  you_dont_have_data: 'Parece que você é novo por aqui... Que tal começar usando </start:1031733050041704518>?'
}