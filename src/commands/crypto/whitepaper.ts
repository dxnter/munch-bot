import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';

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
        duration: 5,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    return msg.embed(
      new MessageEmbed()
        .setTitle(':page_with_curl: Munch Whitepaper')
        .setDescription('https://munchtoken.com/docs/munch-whitepaper.pdf')
        .setColor(EMBED_COLOR)
    );
  }
}
