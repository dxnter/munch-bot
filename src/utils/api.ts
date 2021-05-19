import wretch from 'wretch';
import { cacheGet, cacheSetTTL } from './cache';
import { ETHERSCAN_API_KEY } from '../../config.json';

export interface MarketData {
  price: string;
  volume: number;
  change1h: number;
  change24h: number;
  change7d: number;
}

export async function getMunchMarketData(): Promise<MarketData | unknown> {
  const isCached = await cacheGet('marketdata');

  if (isCached) {
    return isCached;
  } else {
    const {
      price,
      volume_24h,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
    } = await wretch(
      'https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=9272'
    )
      .get()
      .json((json) => {
        return json.data['9272'].quote.USD;
      });

    const response = {
      price: Number(price).toFixed(9),
      volume: volume_24h.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      change1h: Number(percent_change_1h.toFixed(2)),
      change24h: Number(percent_change_24h.toFixed(2)),
      change7d: Number(percent_change_7d.toFixed(2)),
    };

    await cacheSetTTL('marketdata', response);

    return response;
  }
}

export type BurnAmount = number;

export async function getBurnAmount(): Promise<number | unknown> {
  const isCached = await cacheGet('burnamount');

  if (isCached) {
    return isCached;
  } else {
    const burnWalletBalance = await wretch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x944eee930933be5e23b690c8589021ec8619a301&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    )
      .get()
      .json((json) => json.result / 1000000000000000000000);
    const burnAmount = Number(burnWalletBalance.toFixed(4));

    await cacheSetTTL('burnamount', burnAmount);

    return burnAmount;
  }
}
