import { CommandoMessage } from 'discord.js-commando';
import { priceTalkChannelID, botCommandsChannelID } from '../constants';

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function ensure<T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export function isRequiredChannel(message: CommandoMessage): boolean {
  if (message.channel.id === botCommandsChannelID) {
    return true;
  }
  return false;
}

/**
 * Commands that return market data or a large embed
 * should be restricted to the bot-commands channel.
 */
export function requiredChannelMessage(): string {
  return `You can only run this command inside of <#${botCommandsChannelID}>`;
}
