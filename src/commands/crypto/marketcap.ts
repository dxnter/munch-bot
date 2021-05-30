import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { getTokenMarketData, getBurnAmount } from '../../utils/api';
import { EMBED_COLOR } from '../../../config.json';

export default class MarketCapCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'marketcap',
      memberName: 'marketcap',
      group: 'crypto',
      description: 'Returns the market cap of Munch',
      aliases: ['mc'],
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const { price } = await getTokenMarketData();

    const burnAmount = await getBurnAmount();
    const circulatingSupply = 100 - burnAmount;
    const marketCap = (
      circulatingSupply *
      1000000000000 *
      Number(price)
    ).toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return msg.embed(
      new MessageEmbed()
        .addFields(
          { name: '🏦 Total Supply', value: '100T', inline: false },
          {
            name: '🔥 Total Burned',
            value: `${burnAmount.toFixed(2)}T`,
            inline: false,
          },
          {
            name: '💱 Circ Supply',
            value: `${circulatingSupply.toFixed(2)}T`,
            inline: false,
          },
          {
            name: '💰 Market Cap',
            value: marketCap,
            inline: false,
          }
        )
        .setColor(EMBED_COLOR)
    );
  }
}
