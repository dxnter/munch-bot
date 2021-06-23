import wretch from 'wretch';
import cheerio from 'cheerio';
import cache from './cache';
import { ethMunch, bscMunch } from '../constants';
import { charities } from '../data.json';

const { ETHERSCAN_API_KEY, ETHPLORER_API_KEY } = process.env;

export const getEthPrice = async (): Promise<number> => {
  const cachedData = cache.get('ethPrice');

  if (cachedData) {
    return cachedData;
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
  const cachedData = await cache.get('marketdata');

  if (cachedData) {
    return cachedData;
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

export const getEthHolders = async (): Promise<number> => {
  const { holdersCount } = await wretch(
    `https://api.ethplorer.io/getTokenInfo/${ethMunch.contractAddress}?apiKey=${ETHPLORER_API_KEY}`
  )
    .get()
    .json();

  return holdersCount;
};

export const getBscHolders = async (): Promise<number> => {
  const response = await wretch(bscMunch.contractURL).get().text();
  const $ = cheerio.load(response);

  const rawHolders = Number(
    $('#ContentPlaceHolder1_tr_tokenHolders > div > div.col-md-8 > div > div')
      .text()
      .split(' ')[0]
      .replace(',', '')
  );

  return rawHolders;
};

export const getUniswapGasPrices = async (): Promise<Array<string>> => {
  const response = await wretch('https://etherscan.io/gastracker').get().text();
  const $ = cheerio.load(response);

  const gasPrices = $(
    '#content > div.container.mb-4 > div > div.col-lg-6.mb-3.mb-sm-0 > div > div > div.table-responsive > table > tbody > tr:nth-child(2)'
  )
    .text()
    .split('$')
    .slice(1);

  return gasPrices;
};

export async function getBurnAmount(): Promise<number> {
  const cachedData = await cache.get('burnamount');

  if (cachedData) {
    return cachedData;
  } else {
    const burnWalletBalance = await wretch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${ethMunch.contractAddress}&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=${ETHERSCAN_API_KEY}`
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
  const cachedData = await cache.get('donations');

  if (cachedData) {
    return cachedData;
  } else {
    let totalEth = 0;
    let totalUSD = 0;
    let activeEth = 0;
    let activeUSD = 0;

    const ethUsdRate = await getEthPrice();

    for (const { name, address, isActive } of charities) {
      const { result: txnList } = await wretch(
        `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&apiKey=${ETHERSCAN_API_KEY}`
      )
        .get()
        .json();

      txnList.forEach((txn) => {
        if (
          txn.from == ethMunch.contractAddress.toLocaleLowerCase() &&
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
      if (name === 'charity: water') {
        activeEth += 6;
        activeUSD += 6 * ethUsdRate;
      }
    }

    /**
     * An additional 6 ETH was donated to "charity: water" separate from the contract.
     * To account for this, we add it to the total manually.
     */
    totalEth += 6;
    totalUSD += 6 * ethUsdRate;

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
