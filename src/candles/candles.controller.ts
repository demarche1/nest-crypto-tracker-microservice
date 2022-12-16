import { Controller, OnModuleInit, Logger } from '@nestjs/common';
import { CandlesService } from './candles.service';
import { ApiService } from 'src/api/api.service';

@Controller()
export class CandlesController implements OnModuleInit {
  constructor(
    private readonly candlesService: CandlesService,
    private readonly logger: Logger,
    private readonly apiService: ApiService,
  ) {}

  async onModuleInit() {
    await this.onProduceBTC();
  }

  async onProduceBTC() {
    // await this.candlesService.producerBTC();
    const btc = await this.apiService.getPrice('bitcoin', 'usd');

    this.logger.log('BTC produced =>', btc.toString());
  }
}
