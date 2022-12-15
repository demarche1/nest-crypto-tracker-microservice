import { Controller, OnModuleInit } from '@nestjs/common';
import { CandlesService } from './candles.service';

@Controller()
export class CandlesController {
  constructor(private readonly candlesService: CandlesService) {}

  async onModuleInit() {
    await this.onProduceBTC();
  }

  async onProduceBTC() {
    setInterval(async () => {
      await this.candlesService.producerBTC();

      console.log('BTC produced');
    }, 5000);
  }
}
