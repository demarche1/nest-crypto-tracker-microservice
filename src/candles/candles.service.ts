import { Injectable, Inject } from '@nestjs/common';
import { Producer } from 'kafkajs';

@Injectable()
export class CandlesService {
  constructor(
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  async producerBTC() {
    await this.kafkaProducer.send({
      topic: 'btc-candles',
      messages: [{ value: '67498798', key: 'BTC' }],
    });
  }
}
