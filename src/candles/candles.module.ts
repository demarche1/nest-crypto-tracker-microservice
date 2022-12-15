import { Module, Logger } from '@nestjs/common';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { CandlesController } from './candles.controller';
import { CandlesService } from './candles.service';
import { kafkaConfig } from '../kafka/kafka.producer.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaConfig,
      },
    ]),
  ],
  providers: [
    CandlesService,
    Logger,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: (kafkaService: ClientKafka) => kafkaService.connect(),
      inject: ['KAFKA_SERVICE'],
    },
  ],
  controllers: [CandlesController],
})
export class CandlesModule {}
