import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(crypto: string, currency: string): Promise<any> {
    return this.httpService
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`)
      .pipe(
        map(res => res.data?.bitcoin),
        map(bitcoin => bitcoin.usd)
      )
  }
}
