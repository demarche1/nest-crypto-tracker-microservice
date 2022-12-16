import { Producer } from 'kafkajs';
import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Period } from 'src/types/enums/Period';
import { CandlesService } from 'src/candles/candles.service';
import { CoinGecko } from 'src/api/coingecko';

function sleep (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


@Injectable()
export class ProducerService implements OnModuleInit {
  private readonly coinGeckoAPI = new CoinGecko();
  private readonly loopTimes = Period.ONE_MINUTE / Period.TEN_SECONDS;
  private readonly logger = new Logger(ProducerService.name);

  constructor(
    @Inject('KAFKA_PRODUCER')
    private readonly kafkaProducer: Producer,
  ) {}

  onModuleInit() {
    this.produceBTC();
  }

  async produceBTC() {
    while (true) {
      const candlesService = new CandlesService();

      for (let i = 0; i < this.loopTimes; i++) {

        const price = await this.coinGeckoAPI.getCoinPrice('bitcoin', 'usd');
        candlesService.addCurrency('BTC');
        candlesService.addValues(+price);

        this.logger.log(`Market price: ${price}, loop time: ${i + 1}`);

        await sleep(Period.TEN_SECONDS);
      }

      candlesService.closeCandle();

      this.logger.log(`Candle closed start produce a massage`);

      await this.kafkaProducer.send({
        topic: 'BTC_CANDLES',
        messages: [
          {
            value: JSON.stringify(candlesService.toSimpleObject()),
            key: 'BTC'
          }
        ]
      });

      candlesService.reset();
    }
  }
};
