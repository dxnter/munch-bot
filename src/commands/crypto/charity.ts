import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { ensure } from '../../utils';
import { charities } from '../../data.json';
import { EMBED_COLOR } from '../../../config.json';

export default class CharityCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'charity',
      memberName: 'charity',
      group: 'crypto',
      description: 'Returns information on the active charity',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const { charityName, website } = ensure(
      charities.find((charity) => charity.isActive)
    );

    return msg.embed(
      new MessageEmbed()
        .setTitle(`${charityName}`)
        .setURL(website)
        .setColor(EMBED_COLOR)
    );
  }
}
