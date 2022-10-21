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
  },
  get: {
    congrats: 'A arma **{weapon}** acaba de chegar de forma gratuita para você!',
    congrats2: 'A peça de armadura **{armor}** acaba de chegar de forma gratuita para você!',
    you_dont_have_refined_granex: 'Você precisa de pelo menos 1 Granex Refinado para usar este comando.'
  },
  top: {
    dont_have_more_pages: 'Não existem mais páginas de rank a serem mostradas.',
    embed: {
      author: 'Página {page}',
      title: 'Top usuários com mais granex',
      footer: 'Sua posição: #{pos}'
    }
  },
  granex: {
    reply: 'Você possui {granex} Granex e está em {pos}º lugar na posição de usuários com mais Granex.',
    reply2: '{user} possui {granex} Granex e está em {pos}º lugar na posição de usuários com mais Granex.'
  }
}

export const helper = {
  error: 'Ocorreu um erro inesperado ao executar este comando...\n`{error}`',
  permissions: {
    user: 'Você é fraco, lhe faltam as seguintes permissões para executar este comando: {permissions}',
    bot: 'Me faltam as seguintes permissões para que este comando possa funcionar: {permissions}'
  },
  you_dont_have_data: 'Parece que você é novo por aqui... Que tal começar usando </start:1031733050041704518>?',
  user_is_not_in_db: 'Este usuário ainda não criou seus dados através do comando </start:1031733050041704518>'
}