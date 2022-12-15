import { Controller, OnModuleInit, Logger } from '@nestjs/common';
import { CandlesService } from './candles.service';

@Controller()
export class CandlesController implements OnModuleInit {
  constructor(
    private readonly candlesService: CandlesService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    await this.onProduceBTC();
  }

  async onProduceBTC() {
    setInterval(async () => {
      await this.candlesService.producerBTC();

      this.logger.log('BTC produced');
    }, 5000);
  }
}
