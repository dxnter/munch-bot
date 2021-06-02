import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { getHolders } from '../../utils/api';
import { EMBED_COLOR } from '../../../config.json';

export default class HoldersCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'holders',
      memberName: 'holders',
      group: 'crypto',
      description: 'Returns the number of Munch token holders',
      aliases: ['hodlers'],
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    msg.channel.startTyping();
    const holders = await getHolders();

    msg.channel.stopTyping();
    return msg.embed(
      new MessageEmbed()
        .setTitle(':open_hands: Munch Holders')
        .addField('Ethereum', holders)
        .setColor(EMBED_COLOR)
    );
  }
}
