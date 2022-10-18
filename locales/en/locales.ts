export const commands = {
  ping: {
    wait: 'Calm down, headship, I have just initialized! Try again {time}.'
  },
  help: {
    embed: {
      title: 'My Commands'
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
  }
}

export const helper = {
  error: 'An unexpected error has ocurred...\n`{error}`',
  permissions: {
    user: 'You are missing these permissions to execute this command: {permissions}',
    bot: 'I\'m missing this permissiosn to this commands works: {permissions}'
  },
  you_dont_have_data: 'It looks like you are new here... How about you start by using </start:1031733050041704518>?'
}