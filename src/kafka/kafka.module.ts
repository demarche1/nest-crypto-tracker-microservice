import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule } from '@nestjs/microservices';
import { ProducerService } from './producer/producer.service';
import { CandlesModule } from 'src/candles/candles.module';

@Module({
  imports: [
    CandlesModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...KafkaService.config,
      },
    ]),
  ],
  exports: [KafkaService],
  providers: [
    ProducerService,
    KafkaService,
    KafkaService.provider,
  ],
})
export class KafkaModule {}
