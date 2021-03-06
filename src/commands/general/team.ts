import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { team } from '../../data.json';
import { isRequiredChannel, requiredChannelMessage } from '../../utils';
import { EMBED_COLOR } from '../../../config.json';

export default class SocialsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'team',
      memberName: 'team',
      group: 'general',
      description: 'Returns a list of the Munch Team',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    if (!isRequiredChannel(msg)) {
      return msg.reply(requiredChannelMessage);
    }

    const teamEmbed = new MessageEmbed()
      .setTitle(':gear: Munch Team')
      .setColor(EMBED_COLOR);

    for (const { name, role } of team) {
      teamEmbed.addField(role, name);
    }

    return msg.embed(teamEmbed);
  }
}
