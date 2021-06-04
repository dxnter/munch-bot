import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { isRequiredChannel, requiredChannelMessage } from '../../utils';

export default class SocialsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'help',
      memberName: 'help',
      group: 'general',
      description: 'Returns a list of available commands',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 10,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    if (!isRequiredChannel(msg)) {
      return msg.reply(requiredChannelMessage());
    }

    const helpEmbed = new MessageEmbed()
      .setTitle(':information_source: Available Commands')
      .setColor(EMBED_COLOR);

    this.client.registry.commands.forEach((command) => {
      helpEmbed.addField(`!${command.name}`, command.description);
    });

    return msg.author.send(helpEmbed);
  }
}
