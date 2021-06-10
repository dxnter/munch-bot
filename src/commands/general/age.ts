import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import moment from 'moment';

export default class WebCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'age',
      memberName: 'age',
      group: 'general',
      description: 'Returns the days since Munch was launched',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 15,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const creationDate = moment('2021-04-14');
    const today = moment().startOf('day');
    const daysSince = String(creationDate.diff(today, 'days')).substr(1);

    return msg.say(
      `Munch was created April 14th, 2021 • **${daysSince}** days ago`
    );
  }
}
