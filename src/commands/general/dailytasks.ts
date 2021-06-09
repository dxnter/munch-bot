import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import { isRequiredChannel, requiredChannelMessage } from '../../utils';
import { EMBED_COLOR } from '../../../config.json';

export default class DailyTasksCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'dailytasks',
      memberName: 'dailytasks',
      group: 'general',
      description: 'Returns a list of daily tasks to boost Munch',
      aliases: ['dailywork'],
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
        .setTitle(':date: Daily Tasks')
        .addField('"munch token" Google search', 'http://shorturl.at/eloB7')
        .addField('"munch crypto" Google search', 'http://shorturl.at/iqvEV')
        .addField('"munch token" YouTube search', 'http://shorturl.at/mHMX7')
        .addField('"munch crypto" YouTube search', 'http://shorturl.at/nrHIM')
        .addField(
          'Vote "Good" on CoinMarketCap',
          'https://coinmarketcap.com/currencies/munch-token/'
        )
        .addField(
          'Vote "Good" on CoinGecko',
          'https://www.coingecko.com/en/coins/munch-token'
        )
        .addField('Like + RT new Munch Tweets', 'http://shorturl.at/lzCW3')
        .addField(
          'Upvote and reply in Munch threads',
          'https://www.reddit.com/search/?q=munch%20project&sort=new'
        )
        .setColor(EMBED_COLOR)
    );
  }
}
