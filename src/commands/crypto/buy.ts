import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';

export default class BuyCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'buy',
      memberName: 'buy',
      group: 'crypto',
      description: 'Returns the URL to buy Munch',
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
        .addField(
          'Uniswap (v2)',
          'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x944eee930933be5e23b690c8589021ec8619a301&slippage=6000&use=V2'
        )
        .setColor(EMBED_COLOR)
    );
  }
}
