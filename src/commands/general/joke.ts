import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import wretch from 'wretch';
import { EMBED_COLOR } from '../../../config.json';

export default class JokeCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'joke',
      memberName: 'joke',
      group: 'general',
      description: 'Returns a random joke',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 10,
      },
    });
  }

  async run(msg: CommandoMessage): Promise<Message | Message[]> {
    const { setup, punchline } = await wretch(
      'https://official-joke-api.appspot.com/random_joke'
    )
      .get()
      .json((json) => json);

    return msg.embed(
      new MessageEmbed().addField(setup, punchline).setColor(EMBED_COLOR)
    );
  }
}
