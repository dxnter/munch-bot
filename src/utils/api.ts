import wretch from 'wretch';
import cache from './cache';
import { ethContractAddress } from '../constants';
import { charities } from '../data.json';

const { ETHERSCAN_API_KEY, ETHPLORER_API_KEY } = process.env;

export const getEthPrice = async (): Promise<number> => {
  const isCached = cache.get('ethPrice');

  if (isCached) {
    return isCached;
  } else {
    const {
      result: { ethusd: ethUsdRate },
    } = await wretch(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apiKey=${ETHERSCAN_API_KEY}`
    )
      .get()
      .json();

    cache.set('ethPrice', ethUsdRate);

    return ethUsdRate;
  }
};

interface MarketData {
  price: string;
  volume: number;
  change1h: number;
  change24h: number;
  change7d: number;
}

export async function getTokenMarketData(): Promise<MarketData> {
  const isCached = await cache.get('marketdata');

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
      .json(({ data }) => {
        return data['9272'].quote.USD;
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

    cache.set('marketdata', response);

    return response;
  }
}

export const getHolders = async (): Promise<number> => {
  const { holdersCount } = await wretch(
    `https://api.ethplorer.io/getTokenInfo/${ethContractAddress}?apiKey=${ETHPLORER_API_KEY}`
  )
    .get()
    .json();

  return holdersCount;
};

export async function getBurnAmount(): Promise<number> {
  const isCached = await cache.get('burnamount');

  if (isCached) {
    return isCached;
  } else {
    const burnWalletBalance = await wretch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${ethContractAddress}&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    )
      .get()
      .json((json) => json.result / 1000000000000000000000);
    const burnAmount = Number(burnWalletBalance.toFixed(4));

    cache.set('burnamount', burnAmount);

    return burnAmount;
  }
}

interface DonationData {
  totalEth: number;
  totalUSD: number;
  activeEth: number;
  activeUSD: number;
}

export async function getDonations(): Promise<DonationData> {
  const isCached = await cache.get('donations');

  if (isCached) {
    return isCached;
  } else {
    let totalEth = 0;
    let totalUSD = 0;
    let activeEth = 0;
    let activeUSD = 0;

    const ethUsdRate = await getEthPrice();

    for (const { address, isActive } of charities) {
      const { result: txnList } = await wretch(
        `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&apiKey=${ETHERSCAN_API_KEY}`
      )
        .get()
        .json();

      txnList.forEach((txn) => {
        if (
          txn.from == ethContractAddress.toLocaleLowerCase() &&
          txn.isError == 0
        ) {
          const ethValue = txn.value / 10 ** 18;
          const usdValue = ethValue * ethUsdRate;
          totalEth += ethValue;
          totalUSD += usdValue;

          if (isActive) {
            activeEth += ethValue;
            activeUSD += usdValue;
          }
        }
      });
    }

    const donationData = {
      totalEth,
      totalUSD,
      activeEth,
      activeUSD,
    };

    cache.set('donations', donationData);

    return donationData;
  }
}
