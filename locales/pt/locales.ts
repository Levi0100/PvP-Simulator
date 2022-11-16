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
    has_been_picked: 'Você já coletou um item recentemente. Tente novamente {time}',
    def: 'Defesa',
    damage: 'Dano',
    stars: 'Estrelas',
    status: 'Status do Item'
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
    dont_have_this: 'Você não possui este item em seu inventário. Verifique seu inventário com </inventory:1035461161451262044> e tente novamente.',
    equiped: 'Você equipou **{item}** com sucesso!'
  },
  inventory: {
    embed: {
      title: 'Seu Inventário',
      footer: 'Filtro: {filter}',
      field: 'Posição: {pos}\nDefesa: {def}\nEstrelas: {stars}',
      field2: 'Posição: {pos}\nDano: {damage}\nEstrelas: {stars}'
    },
    empty: 'Vazio... igual a conta bancária do meu criador.'
  },
  pvp: {
    needs_weapon: 'Você precisa equipar uma arma para poder iniciar uma partida PvP.',
    needs_weapon2: '{user} precisa equipar uma arma primeiro.',
    request: '{user} {author} quer iniciar uma partida de PvP apostada com você valendo {value} granex. E aí, vai encarar?',
    button: {
      label: 'Aceitar',
      attack: 'ATACAR'
    },
    attack: '{author} atacou {user} e fez um dano de {damage}\n{user} agora tem {energy} energia',
    starting: 'Iniciando a partida.',
    winner: '{winner} foi o grande vencedor da rodada.\n**Prêmio da aposta:** {value} granex',
    energy_not_enough: 'Você não possui energia suficiente para uma partida PvP.',
    energy_not_enough2: '{user} não possui energia suficiente para iniciar uma partida PvP.',
    winner2: '{winner} foi o grande vencedor da rodada.',
    request2: '{user} {author} quer iniciar uma partida de PvP normal com você. E aí, vai encarar?',
    already_in_match: 'Você já está em uma partida de PvP. Aguarde até o término da mesma e tente novamente mais tarde.'
  },
  convert: {
    done: '{refinedGranex} Granex Refinado foram convertidos em {granex} Granex.'
  },
  shop: {
    embed: {
      author: 'Página {page}',
      title: 'LOJA',
      field: 'Dano: {damage}\nEstrelas: {stars}'
    },
    done: 'Você comprou **{item}** com sucesso!'
  },
  remove: {
    done: 'Você removeu **{item}** do seu inventário com sucesso!',
    restored: 'Energia restaurada com sucesso!'
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
  dont_have_granex: 'Você não possui essa quantidade de Granex. Consulte seu saldo com </granex:1032759218232627322> e tente novamente.',
  dont_have_granex2: '{user} não possui essa quantidade de Granex.',
  limit_of_weapons: 'Você atingiu o limite máximo de armas suportado até o momento. Tente remover alguma arma inútil do seu inventário com </remove sword:1042512580083724419> ou </remove broad_sword:1042512580083724419> e tente novamente.',
  limit_of_armors: 'Você atingiu o limite máximo de armaduras suportado até o momento. Tente remover alguma armadura inútil do seu inventário com </remove helmet:1042512580083724419>, </remove chest:1042512580083724419>, </remove pants:1042512580083724419>, ou </remove boots:1042512580083724419> e tente novamente.'
}