import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConsumerController } from './consumer.controller';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
  controllers: [ConsumerController],
})
export class KafkaModule {}
