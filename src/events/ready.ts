import { CommandoClient } from 'discord.js-commando';
import chalk from 'chalk';
const log = console.log;

const readyEvent = (client: CommandoClient): void => {
  log(chalk`{green.bold [Success]} {green Valid Etherscan API Key}`);
  log(
    chalk`{cyan.bold [Discord.js]} {white.bold ${
      client!.user!.username
    }} {cyan.bold is online!}`
  );
  client!.user!.setActivity('!help', { type: 'WATCHING' });
};

export default readyEvent;
