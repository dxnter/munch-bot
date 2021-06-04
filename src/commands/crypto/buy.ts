import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { uniSwapURL } from '../../constants';

export default class BuyCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'buy',
      memberName: 'buy',
      group: 'crypto',
      description: 'Returns links to buy Munch',
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
        .setDescription(
          'Ensure 6% slippage is set and a round number of tokens are being swapped'
        )
        .addField('Uniswap (v2)', uniSwapURL)
        .setColor(EMBED_COLOR)
    );
  }
}
