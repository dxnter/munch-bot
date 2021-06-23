import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { getDonations } from '../../utils/api';
import {
  formatUSD,
  ensure,
  isRequiredChannel,
  requiredChannelMessage,
} from '../../utils';
import { charities } from '../../data.json';
import { EMBED_COLOR } from '../../../config.json';
import { charityTrackerURL } from '../../constants';

export default class DonationsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'donations',
      memberName: 'donations',
      group: 'crypto',
      description: 'Returns the amount of Ethereum donated by Munch',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 30,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    if (!isRequiredChannel(msg)) {
      return msg.reply(requiredChannelMessage);
    }

    msg.channel.startTyping();
    const { totalEth, totalUSD, activeEth, activeUSD } = await getDonations();
    const { name: charityName } = ensure(
      charities.find((charity) => charity.isActive)
    );

    msg.channel.stopTyping();
    return msg.embed(
      new MessageEmbed()
        .setTitle(':money_with_wings: Munch Donation Tracker')
        .setURL(charityTrackerURL)
        .addField('**Total Overall Donated**', `${totalEth.toFixed(2)} ETH`)
        .addField('**USD Value**', formatUSD(totalUSD))
        .addField('**Total Active Donated**', `${activeEth.toFixed(2)} ETH`)
        .addField('**USD Value**', formatUSD(activeUSD))
        .setFooter(`Active Charity • ${charityName}`)
        .setColor(EMBED_COLOR)
    );
  }
}
