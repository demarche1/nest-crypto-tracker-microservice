import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CandleMessage } from 'src/types/message.types';

@Injectable()
export class ConsumerService {
  @MessagePattern('BTC_CANDLES')
  async BTC_Consumer(@Payload() message: CandleMessage) {
    console.log(message);
  }
}
