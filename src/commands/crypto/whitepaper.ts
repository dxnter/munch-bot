import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { whitepaperURL } from '../../constants';

export default class WhitepaperCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'whitepaper',
      memberName: 'whitepaper',
      group: 'crypto',
      description: 'Returns the URL to the Munch Whitepaper',
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
        .setTitle(':page_with_curl: Munch Whitepaper')
        .setDescription(whitepaperURL)
        .setColor(EMBED_COLOR)
    );
  }
}
