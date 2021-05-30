import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { getDonations } from '../../utils/api';
import { formatUSD, ensure } from '../../utils';
import { charities } from '../../data.json';
import { EMBED_COLOR } from '../../../config.json';

export default class DonationsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'donations',
      memberName: 'donations',
      group: 'crypto',
      description: 'Returns an embed of the Ethereum donated by Munch',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const { totalEth, totalUSD, activeEth, activeUSD } = await getDonations();
    const { charityName } = ensure(
      charities.find((charity) => charity.isActive)
    );

    return msg.embed(
      new MessageEmbed()
        .setTitle(':money_with_wings: Munch Donation Tracker')
        .addField('Total Overall Donated', `${totalEth.toFixed(2)} ETH`)
        .addField('USD Value', formatUSD(totalUSD))
        .addField('Total Active Donated', `${activeEth.toFixed(2)} ETH`)
        .addField('USD Value', formatUSD(activeUSD))
        .setFooter(`Active Charity • ${charityName}`)
        .setColor(EMBED_COLOR)
    );
  }
}
