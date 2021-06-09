import { CommandoMessage } from 'discord.js-commando';
import {
  botCommandsChannelID,
  botCommandsTestingChannelID,
} from '../constants';

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
  if (
    message.channel.id === botCommandsChannelID ||
    message.channel.id === botCommandsTestingChannelID
  ) {
    return true;
  }
  return false;
}

export const requiredChannelMessage = `you can only run this command inside of <#${botCommandsChannelID}>`;
