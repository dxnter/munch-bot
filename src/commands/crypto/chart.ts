import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { ethMunch, bscMunch } from '../../constants';

export default class ChartCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'chart',
      memberName: 'chart',
      group: 'crypto',
      description: 'Returns links to the Munch charts',
      aliases: ['charts'],
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
        .setTitle(':chart_with_upwards_trend: Munch Charts')
        .addField('**ETH**', ethMunch.chartURL)
        .addField('**BNB**', bscMunch.chartURL)
        .setColor(EMBED_COLOR)
    );
  }
}
