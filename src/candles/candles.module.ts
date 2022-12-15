import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { CandlesController } from './candles.controller';
import { CandlesService } from './candles.service';
import { kafkaConsumerConfig } from '../kafka/kafka.consumer.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaConsumerConfig,
      }
    ])
  ],
  providers: [
    CandlesService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: (kafkaService: ClientKafka) => kafkaService.connect(),
      inject: ['KAFKA_SERVICE'],
    },
  ],
  controllers: [CandlesController],
})
export class CandlesModule {}
