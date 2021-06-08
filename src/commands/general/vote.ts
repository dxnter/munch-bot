import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { charityTrackerURL } from '../../constants';

export default class VoteCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'vote',
      memberName: 'vote',
      group: 'general',
      description: 'Returns the URL to the Munch voting platform',
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
        .setTitle(':ballot_box: Munch Voting Platform')
        .setDescription(charityTrackerURL)
        .setColor(EMBED_COLOR)
    );
  }
}
