import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { getMunchMarketData } from '../../utils/api';
import { EMBED_COLOR } from '../../../config.json';

export default class VolumeCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'volume',
      memberName: 'volume',
      group: 'crypto',
      description: 'Returns the 24 hour volume of Munch',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const { volume } = await getMunchMarketData();

    return msg.embed(
      new MessageEmbed()
        .addField('🧊 24hr Volume', volume)
        .setColor(EMBED_COLOR)
    );
  }
}
