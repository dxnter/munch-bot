import { CommandoClient } from 'discord.js-commando';
import readyEvent from '../events/ready';
import path from 'path';
import { OWNERS, DISCORD_BOT_TOKEN } from '../../config.json';

export default class MunchClient extends CommandoClient {
  public constructor() {
    super({
      commandPrefix: '!',
      owner: OWNERS.split(',').map((id) => id.trim()),
      disableMentions: 'everyone',
    });
  }

  init() {
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
      })
      .registerCommandsIn(path.join(__dirname, '../commands'));

    this.on('ready', () => readyEvent(this));

    this.login(DISCORD_BOT_TOKEN);
  }
}
