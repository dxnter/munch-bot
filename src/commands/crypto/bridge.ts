import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { munchBridgeURL } from '../../constants';
import { EMBED_COLOR } from '../../../config.json';

export default class WebCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'bridge',
      memberName: 'bridge',
      group: 'crypto',
      description: 'Returns the URL to the Munch Token Bridge',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    return msg.embed(
      new MessageEmbed()
        .setTitle(':bridge_at_night: Munch Token Bridge')
        .setDescription(munchBridgeURL)
        .setColor(EMBED_COLOR)
    );
  }
}
