import { Request } from '../request';

type CoinGeckoResponse = {
  [key: string]: {
    [key: string]: number;
  };
};

export class CoinGecko extends Request {
  constructor() {
    super('https://api.coingecko.com/api/v3', null, 10000);
  }

  async getCoinPrice(id: string, currency: string) {
    const data = await this.wrapper<CoinGeckoResponse>(`/simple/price`, {
      ids: id,
      vs_currencies: currency,
    });

    return data[id][currency];
  }
}
