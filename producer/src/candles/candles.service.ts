import { CandleColors } from './enums/CandleColors';

type Candle = {
  low: number;
  high: number;
  open: number;
  close: number;
  color: CandleColors;
  finalDateTime: Date;
  currency: Currency;
};

type Currency = 'BTC' | 'ETH' | undefined;

export class CandlesService {
  constructor(
    private low = Infinity,
    private high = -Infinity,
    private open = 0,
    private close = 0,
    private color = CandleColors.UNDETERMINED,
    private finalDateTime = undefined,
    private values = [],
    private currency: Currency = undefined,
  ) {}

  addCurrency(currency: Currency) {
    this.currency = currency;
  }

  addValues(value: number) {
    if (this.values.length === 0) this.open = value;

    if (value > this.high) this.high = value;

    if (value < this.low) this.low = value;

    this.values.push(value);
  }

  setCandleColor() {
    if (this.open > this.close) {
      this.color = CandleColors.RED;
      return;
    }

    if (this.open < this.close) {
      this.color = CandleColors.GREEN;
      return;
    }
  }

  closeCandle() {
    if (!this.values.length) return;

    this.close = this.values[this.values.length - 1];
    this.finalDateTime = new Date();

    this.setCandleColor();
  }

  toSimpleObject(): Candle {
    Reflect.deleteProperty(this, 'values');

    return this as unknown as Candle;
  }

  reset() {
    this.low = Infinity;
    this.high = -Infinity;
    this.open = 0;
    this.close = 0;
    this.color = CandleColors.UNDETERMINED;
    this.finalDateTime = undefined;
    this.values = [];
    this.currency = undefined;
  }
}
