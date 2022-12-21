import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConsumerService } from './consumer/consumer.service';

@Module({
  providers: [KafkaService, ConsumerService],
  exports: [KafkaService],
})
export class KafkaModule {}
