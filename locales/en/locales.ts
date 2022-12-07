export const commands = {
  ping: {
    wait: 'Calm down, headship, I have just initialized! Try again {time}.'
  },
  help: {
    embed: {
      title: 'My Commands',
      description: 'Need Help? Join my Community & Support server for your questions by clicking the button below!'
    }
  },
  start: {
    you_already_created_data: 'You already created your data. You are welcome to play **PvP Simulator**.',
    done: 'Your data has been created successfully. You can already play **PvP Simulator**.\nYou can change the language that I interact with you with </config language:1031022057644892331>'
  },
  daily: {
    has_been_picked: 'You already picked your daily prize. Try again {time}',
    congrats: 'In the today\'s daily you received {granex} Granex!',
    congrats2: 'Congratulations, what a lucky guy you are! You received a bonus of {refinedGranex} Refined Granex.'
  },
  get: {
    congrats: 'The weapon **{weapon}** has just arrived for free to you!',
    congrats2: 'The armor piece **{armor}** has just arrived for free to you!',
    you_dont_have_refined_granex: 'You need at least 1 Refined Granex to use this command.',
    has_been_picked: 'You already collected a item recently. Try again {time}',
    def: 'Defense',
    damage: 'Damage',
    rarity: 'Rarity',
    status: 'Item Status'
  },
  top: {
    dont_have_more_pages: 'There are no more pages to show.',
    embed: {
      author: 'Page {page}',
      title: 'Top users with more granex',
      footer: 'Your position: #{pos}'
    }
  },
  granex: {
    reply: 'You have {granex} Granex and you are in #{pos} in the position of users with more Granex.\nAlso you have {refinedGranex} Refined Granex.',
    reply2: '{user} has {granex} Granex and is in #{pos} in the position of users with more Granex.\nAlso {user} has {refinedGranex} Refined Granex.'
  },
  equip: {
    dont_have_this: 'You don\'t have this item in your inventory. Verify your inventory with </inventory:1035461161451262044> and try again.',
    equiped: 'You equiped **{item}** successfully!'
  },
  inventory: {
    embed: {
      title: 'Your inventory',
      footer: 'Filtro: {filter}',
      field: 'Position: {pos}\nDefense: {def}\nRarity: {rarity}',
      field2: 'Position: {pos}\nDamage: {damage}\nRarity: {rarity}'
    },
    empty: 'Empty... like my creator\'s bank account.',
    def: 'Defense: {def}',
    damage: 'Damage: {damage}',
    rarity: 'Rarity: {rarity}'
  },
  pvp: {
    needs_weapon: 'You need equip a weapon to start a PvP match.',
    needs_weapon2: '{user} needs equip a weapon first.',
    request: '{user} {author} wants start a bet PvP match with you worth {granex} granex. So, are you in?',
    button: {
      label: 'Accept',
      attack: 'ATTACK'
    },
    attack: '{author} attacked {user} and did a damage of {damage}\n{user} now has {energy} energy',
    starting: 'Starting the match.',
    winner: '{winner} was the big winner of this match.\n**Bet award:** {value} granex',
    energy_not_enough: 'You don\'t have enough energy to start a PvP match.',
    energy_not_enough2: '{user} doesn\'t have enough energy to start a PvP match.',
    winner2: '{winner} was the big winner of this match.',
    request2: '{user} {author} wants start a normal PvP match with you. So, are you in?',
    already_in_match: 'You are already in a PvP match. Wait until it finishes and try again later.'
  },
  convert: {
    done: '{refinedGranex} Refined Granex has been converted to {granex} Granex.'
  },
  shop: {
    embed: {
      author: 'Page {page}',
      title: 'SHOP',
      field: 'Defense: {def}\nRarity: {rarity}',
      field2: 'Damage: {damage}\nRarity: {rarity}'
    },
    done: 'You bought **{item}** successfully!',
    restored: 'Energy restored successfully!'
  },
  remove: {
    done: 'You removed **{item}** from your inventory successfully!'
  },
  background: {
    already_sent: 'You already sent a background for analysis. Wait until it be verified and try again',
    done: 'Background sent to analysis successfully! O prazo de verificação é de até 24 horas pós envio.\nIt is recommended that you log into our server to follow the process.'
  }
}

export const helper = {
  error: 'An unexpected error has ocurred...\n`{error}`',
  permissions: {
    user: 'You are missing these permissions to execute this command: {permissions}',
    bot: 'I\'m missing this permissiosn to this commands works: {permissions}'
  },
  you_dont_have_data: 'It looks like you are new here... How about you start by using </start:1031733050041704518>?',
  user_is_not_in_db: 'This user still not created his data by the </start:1031733050041704518> command.',
  dont_have_granex: 'You don\'t have this Granex amount. View your balance with </granex:1032759218232627322> and try again.',
  dont_have_granex2: '{user} doesn\'t have this Granex amount.',
  limit_of_weapons: 'You have reached the maximum limit of weapons supported so far. Try to remove any useless weapons from your inventory with </remove sword:1042512580083724419> or </remove broad_sword:1042512580083724419> and try again.',
  limit_of_armors: 'You have reached the maximum limit of armors supported so far. Try to remove any useless armors from your inventory with </remove helmet:1042512580083724419>, </remove chest:1042512580083724419>, </remove pants:1042512580083724419>, or </remove boots:1042512580083724419> and try again.',
  server: 'Comunidade e Suporte'
}