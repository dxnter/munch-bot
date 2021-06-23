import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { getUniswapGasPrices } from '../../utils/api';

export default class GasCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'gas',
      memberName: 'gas',
      group: 'crypto',
      description: 'Returns the USD cost of gas for a Uniswap swap',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 30,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    msg.channel.startTyping();
    const [low, average, high] = await getUniswapGasPrices();

    msg.channel.stopTyping();
    return msg.embed(
      new MessageEmbed()
        .setTitle(':fuelpump: Uniswap Gas Cost')
        .addField('**Low**', `$${low}`, true)
        .addField('**Average**', `$${average}`, true)
        .addField('**High**', `$${high}`, true)
        .setColor(EMBED_COLOR)
    );
  }
}
