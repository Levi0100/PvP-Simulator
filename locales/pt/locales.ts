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
    you_dont_have_refined_granex: 'Você precisa de pelo menos 1 Granex Refinado para usar este comando.',
    has_been_picked: 'Você já coletou um item recentemente. Tente novamente {time}'
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
    reply: 'Você possui {granex} Granex e está em {pos}º lugar na posição de usuários com mais Granex.\nVocê também possui {refinedGranex} Granex Refinado.',
    reply2: '{user} possui {granex} Granex e está em {pos}º lugar na posição de usuários com mais Granex.\n{user} também possui {refinedGranex} Granex Refinado.'
  },
  equip: {
    dont_have_this: 'Você não possui este item em seu inventário. Verifique seu inventário e tente novamente.',
    equiped: 'Você equipou **{item}** com sucesso!'
  },
  inventory: {
    embed: {
      title: 'Seu Inventário',
      footer: 'Filtro: {filter}',
      field: 'Posição: {pos}\nDefesa: {def}\nEstrelas: {stars}'
    },
    empty: 'Vazio... igual a conta bancária do meu criador.'
  },
  pvp: {
    needs_weapon: 'Você precisa equipar uma arma para poder iniciar uma partida PvP.',
    needs_weapon2: '{user} precisa equipar uma arma primeiro.',
    request: '{user} {author} quer iniciar uma partida de PvP apostada com você valendo {value} granex. E aí, vai encarar?',
    button: {
      label: 'Aceitar'
    },
    tried_attack: '{author} atacou {user}',
    starting: 'Iniciando a partida.'
  }
}

export const helper = {
  error: 'Ocorreu um erro inesperado ao executar este comando...\n`{error}`',
  permissions: {
    user: 'Você é fraco, lhe faltam as seguintes permissões para executar este comando: {permissions}',
    bot: 'Me faltam as seguintes permissões para que este comando possa funcionar: {permissions}'
  },
  you_dont_have_data: 'Parece que você é novo por aqui... Que tal começar usando </start:1031733050041704518>?',
  user_is_not_in_db: 'Este usuário ainda não criou seus dados através do comando </start:1031733050041704518>',
  dont_have_granex: 'Você não possui essa quantidade de granex. Consulte seu saldo com </granex:1032759218232627322> e tente novamente.',
  dont_have_granex2: '{user} não possui essa quantidade de granex.'
}