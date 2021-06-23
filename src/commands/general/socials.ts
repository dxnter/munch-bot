import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';

export default class SocialsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'socials',
      memberName: 'socials',
      group: 'general',
      description: 'Returns a list of Munch social media accounts',
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
        .setTitle('Social Media')
        .addField('**Twitter**', 'https://twitter.com/MunchToken')
        .addField('**Instagram**', 'https://www.instagram.com/munchtoken')
        .addField(
          '**YouTube**',
          'https://www.youtube.com/channel/UC9mrzv6MB23uUPTrBpLz1zQ'
        )
        .addField('**Reddit**', 'https://www.reddit.com/r/MunchToken')
        .setColor(EMBED_COLOR)
    );
  }
}
