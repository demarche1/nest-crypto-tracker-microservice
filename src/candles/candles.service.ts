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

  produceCandles(currency: string) {
    const Candle = {
      LOW: Infinity,
      HIGH: -Infinity,
      OPEN: 0,
      CLOSE: 0,
      COLOR: undefined,
      CURRENCY: currency,
      FINALDATETIME: undefined,
    };
    const VALUES = [];

    const addValues = (value: number) => {
      if (!VALUES.length) Candle.OPEN = value;

      if (value > Candle.HIGH) Candle.HIGH = value;

      if (value < Candle.LOW) Candle.LOW = value;

      VALUES.push(value);
    };

    const setCandleColor = () => {
      if (Candle.OPEN > Candle.CLOSE) Candle.COLOR = 'RED';

      if (Candle.OPEN < Candle.CLOSE) Candle.COLOR = 'GREEN';
    };

    const closeCandle = () => {
      if (!VALUES.length) return;

      Candle.CLOSE = VALUES.pop();

      Candle.FINALDATETIME = new Date();
    };

    const getCandle = () => Candle;

    return { addValues, setCandleColor, closeCandle, getCandle };
  }

  checkCandle(loopTimes: number, currency: string) {
    while (true) {
      const { addValues, closeCandle, getCandle, setCandleColor } =
        this.produceCandles(currency);

      for (let i = 0; i < loopTimes; i++) {
        addValues(Math.random());
      }
    }
  }
}
