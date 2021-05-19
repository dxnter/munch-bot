import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { getMunchMarketData, getBurnAmount } from '../../utils/api';
import { EMBED_COLOR } from '../../../config.json';

export default class PriceCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'price',
      memberName: 'price',
      group: 'crypto',
      description: 'Returns the current price of Munch',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const { price, volume, change1h, change24h, change7d } =
      await getMunchMarketData();

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
        .setAuthor('Munch Price')
        .setThumbnail('https://munchtoken.com/assets/images/doughnuts/logo.png')
        .setDescription('Prices updates every 5 minutes')
        .addFields(
          { name: '💸 Price', value: `$${price}`, inline: true },
          { name: '🧊 Volume', value: volume, inline: true },
          { name: '💰 Market Cap', value: marketCap, inline: true },
          {
            name: '📈 1hr Change',
            value:
              change1h > 0 ? '⬆️ ' + change1h + '%' : '⬇️ ' + change1h + '%',
            inline: true,
          },
          {
            name: '📈 24hr Change',
            value:
              change24h > 0 ? '⬆️ ' + change24h + '%' : '⬇️ ' + change24h + '%',
            inline: true,
          },
          {
            name: '📈 7D Change',
            value:
              change7d > 0 ? '⬆️ ' + change7d + '%' : '⬇️ ' + change7d + '%',
            inline: true,
          }
        )
        .setColor(EMBED_COLOR)
    );
  }
}
