import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';

export default class ContractCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'contract',
      memberName: 'contract',
      group: 'crypto',
      description: 'Returns the URL to the Munch contract',
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
        .setTitle(':bookmark_tabs: Munch Contract')
        .addField(
          'Ethereum',
          'https://etherscan.io/token/0x944eee930933be5e23b690c8589021ec8619a301'
        )
        .setColor(EMBED_COLOR)
    );
  }
}
