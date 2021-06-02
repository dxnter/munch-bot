import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { munchWebsiteURL } from '../../constants';

export default class WebCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'web',
      memberName: 'web',
      group: 'general',
      description: 'Returns the URL to the Munch website',
      aliases: ['website', 'site'],
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 10,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    return msg.embed(
      new MessageEmbed()
        .setTitle(':globe_with_meridians: Munch Website')
        .setDescription(munchWebsiteURL)
        .setColor(EMBED_COLOR)
    );
  }
}
