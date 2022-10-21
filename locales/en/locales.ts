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
    done: 'Your data has been created successfully. You can already play **PvP Simulator**.'
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
    has_been_picked: 'You already collected a item recently. Try again {time}'
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
  }
}

export const helper = {
  error: 'An unexpected error has ocurred...\n`{error}`',
  permissions: {
    user: 'You are missing these permissions to execute this command: {permissions}',
    bot: 'I\'m missing this permissiosn to this commands works: {permissions}'
  },
  you_dont_have_data: 'It looks like you are new here... How about you start by using </start:1031733050041704518>?',
  user_is_not_in_db: 'This user still not created his data by the </start:1031733050041704518> command.'
}