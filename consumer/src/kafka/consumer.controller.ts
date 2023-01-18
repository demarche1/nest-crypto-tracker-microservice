import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CandleMessage } from 'src/types/message.types';

@Controller()
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  @MessagePattern('BTC_CANDLES')
  async BtcConsumer(@Payload() message: CandleMessage) {
    this.logger.log(`Message received [BTC_CANDLES]`);
    this.logger.log(message);
  }
}
