import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOR } from '../../../config.json';
import { ethMunch, bscMunch } from '../../constants';

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
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    return msg.embed(
      new MessageEmbed()
        .setTitle(':bookmark_tabs: Munch Contracts')
        .addField('Ethereum', ethMunch.contractURL)
        .addField('Binance Smart Chain', bscMunch.contractURL)
        .setColor(EMBED_COLOR)
    );
  }
}
