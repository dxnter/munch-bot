import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';

export default class ChartCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'chart',
      memberName: 'chart',
      group: 'crypto',
      description: 'Returns the URL to the Munch chart',
      aliases: ['charts'],
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
        .setTitle(':chart_with_upwards_trend: Munch Charts')
        .addField(
          'DEXTools',
          'https://www.dextools.io/app/uniswap/pair-explorer/0x8745df04862b854d0d7ee8ecf80ac4e9c109d547'
        )
        .addField(
          'DexGuru',
          'https://dex.guru/token/0x944eee930933be5e23b690c8589021ec8619a301-eth'
        )
        .setColor(EMBED_COLOR)
    );
  }
}
