import { CommandoClient } from 'discord.js-commando';
import readyEvent from '../events/ready';
import path from 'path';
import { OWNERS } from '../../config.json';

const { DISCORD_BOT_TOKEN } = process.env;

export default class MunchClient extends CommandoClient {
  public constructor() {
    super({
      commandPrefix: '!',
      owner: OWNERS.split(',').map((id) => id.trim()),
      disableMentions: 'everyone',
    });
  }

  init(): void {
    this.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerGroups([
        ['general', 'General'],
        ['crypto', 'Crypto'],
      ])
      .registerDefaultCommands({
        help: false,
        ping: false,
        prefix: false,
        commandState: false,
        unknownCommand: false,
        eval: false,
      })
      .registerCommandsIn(path.join(__dirname, '../commands'));

    this.on('ready', () => readyEvent(this));

    this.login(DISCORD_BOT_TOKEN);
  }
}
